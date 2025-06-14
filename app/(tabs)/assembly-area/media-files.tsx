import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AudioRecorder from '../../../components/AudioRecorder';
import ImageUploader from '../../../components/ImageUploader';
import CustomHeader from '../../../components/CustomHeader';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useRouter } from 'expo-router';
import { useFormData } from '../../../context/FormDataContext';

interface AudioRecording {
  uri: string;
  name: string;
  timestamp: Date;
  duration: number;
}

interface MediaFilesProps {
  route: {
    params: {
      setData: (data: { audioRecordings: AudioRecording[] }) => void;
      onComplete?: () => void;
      data: { audioRecordings: AudioRecording[] };
      incidentId: string;
    };
  };
}

const MediaFiles: React.FC<MediaFilesProps> = ({ route }) => {
  // const { setData, onComplete, data } = route.params;
  // const navigation = useNavigation();
  const router = useRouter();
  const {audioRecordings, setAudioRecordings} = useFormData();
  const [showRecorder, setShowRecorder] = useState(false);
  const [playingSound, setPlayingSound] = useState<Audio.Sound | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  // Local state to manage recordings for immediate UI updates
  const [localRecordings, setLocalRecordings] = useState<AudioRecording[]>(
    audioRecordings || []
  );

  // Update local state when data prop changes
  useEffect(() => {
    if (audioRecordings) {
      setLocalRecordings(audioRecordings);
    }
  }, [audioRecordings]);

  useEffect(() => {
    return () => {
      if (playingSound) {
        playingSound.unloadAsync();
      }
    };
  }, [playingSound]);

  const openRecorder = () => {
    setShowRecorder(true);
  };

  const handleSaveRecording = (uri: string, duration: number) => {
    try {
      const newRecording: AudioRecording = {
        uri,
        name: `Recording ${(localRecordings?.length || 0) + 1}`,
        timestamp: new Date(),
        duration,
      };
      
      console.log("Creating new recording:", newRecording);
      
      // Update local state immediately for UI responsiveness
      const updatedRecordings = [...localRecordings, newRecording];
      setLocalRecordings(updatedRecordings);
      
      // Update parent state with the complete updated array
      // setData({ audioRecordings: updatedRecordings });
      setAudioRecordings(updatedRecordings);
      // Call completion callback
      // onComplete?.();

      console.log("New recording saved:", newRecording);
      console.log("Total recordings:", updatedRecordings.length);
      console.log("Updated recordings array:", updatedRecordings);
      
    } catch (error) {
      console.error("Error saving recording:", error);
      Alert.alert('Error', 'Failed to save recording');
    }
  };

  const deleteRecording = (index: number) => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              const updatedRecordings = localRecordings.filter((_, i) => i !== index);
              setLocalRecordings(updatedRecordings);
              // setData({ audioRecordings: updatedRecordings });
              // onComplete?.();
              setAudioRecordings(updatedRecordings);
            } catch (error) {
              console.error("Error deleting recording:", error);
              Alert.alert('Error', 'Failed to delete recording');
            }
          }
        }
      ]
    );
  };

  const togglePlayback = async (uri: string, recordingName: string) => {
    try {
      if (playingSound && currentlyPlaying !== uri) {
        await playingSound.stopAsync();
        await playingSound.unloadAsync();
        setPlayingSound(null);
        setCurrentlyPlaying(null);
      }

      if (currentlyPlaying === uri && playingSound) {
        await playingSound.pauseAsync();
        setCurrentlyPlaying(null);
      } else {
        if (!playingSound || currentlyPlaying !== uri) {
          const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true }
          );
          
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
              setCurrentlyPlaying(null);
              sound.unloadAsync();
              setPlayingSound(null);
            }
          });
          
          setPlayingSound(sound);
        } else {
          await playingSound.playAsync();
        }
        setCurrentlyPlaying(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not play audio recording');
      console.error('Playback error:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <CustomHeader
        title="Media Files"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Audio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          
          {/* Record New Audio Button */}
          <TouchableOpacity 
            style={styles.recordButton}
            onPress={openRecorder}
          >
            <Ionicons name="mic" size={20} color="#F9980D" />
            <Text style={styles.recordButtonText}>Record audio...</Text>
          </TouchableOpacity>

          {/* Recorded Audio List */}
          {localRecordings && localRecordings.length > 0 ? (
            <View style={styles.recordingsList}>
              {localRecordings.map((recording, index) => (
                <View key={`${recording.uri}-${index}`} style={styles.recordingItem}>
                  <View style={styles.recordingHeader}>
                    <View style={styles.recordingInfo}>
                      <Text style={styles.recordingName}>{recording.name}</Text>
                      <Text style={styles.recordingTime}>
                        {formatTime(recording.timestamp)} • {formatDuration(recording.duration)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteRecording(index)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => togglePlayback(recording.uri, recording.name)}
                  >
                    <Ionicons 
                      name={currentlyPlaying === recording.uri ? "pause" : "play"} 
                      size={16} 
                      color="#3B82F6" 
                    />
                    <Text style={styles.playButtonText}>
                      {currentlyPlaying === recording.uri ? "Pause" : "Play"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noRecordingsText}>No recordings yet</Text>
          )}
        </View>

        {/* Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Images</Text>
          <ImageUploader />
        </View>
      </ScrollView>

      {/* Recorder Modal */}
      {showRecorder && (
        <AudioRecorder
          onClose={() => setShowRecorder(false)}
          onSave={handleSaveRecording}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    fontFamily: 'Manrope-Bold',
  },
  recordButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    fontFamily: 'Manrope-Regular',
  },
  recordButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  recordingsList: {
    gap: 12,
  },
  recordingItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  recordingTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  deleteButton: {
    padding: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  debugText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  noRecordingsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default MediaFiles;