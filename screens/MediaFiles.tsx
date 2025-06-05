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
import AudioRecorder from '../components/AudioRecorder';
import ImageUploader from '../components/ImageUploader';
import CustomHeader from '../components/CustomHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

interface AudioRecording {
  uri: string;
  name: string;
  timestamp: Date;
  duration: number;
}

const MediaFiles: React.FC<{route: any}> = ({route}) => {
  const navigation = useNavigation();
  const incidentId = route.params?.incidentId;
  const {authToken} = useAuth();
  const [showRecorder, setShowRecorder] = useState(false);
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);
  const [playingSound, setPlayingSound] = useState<Audio.Sound | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup sound when component unmounts
      if (playingSound) {
        playingSound.unloadAsync();
      }
    };
  }, [playingSound]);

  const openRecorder = () => {
    setShowRecorder(true);
  };

  const handleSaveRecording = (uri: string, duration: number) => {
    const newRecording: AudioRecording = {
      uri,
      name: `Recording ${audioRecordings.length + 1}`,
      timestamp: new Date(),
      duration,
    };
    setAudioRecordings(prev => [...prev, newRecording]);
    handleAPICall();
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
            setAudioRecordings(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  const togglePlayback = async (uri: string, recordingName: string) => {
    try {
      // Stop current playback if playing different recording
      if (playingSound && currentlyPlaying !== uri) {
        await playingSound.stopAsync();
        await playingSound.unloadAsync();
        setPlayingSound(null);
        setCurrentlyPlaying(null);
      }

      if (currentlyPlaying === uri && playingSound) {
        // Pause current recording
        await playingSound.pauseAsync();
        setCurrentlyPlaying(null);
      } else {
        // Play recording
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

  const audioRecordingToBlob = async (recording: AudioRecording): Promise<Blob> => {
    const response = await fetch(recording.uri);
    return await response.blob();
  };

//   const handleAPICall =async () => {
//     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzI1NTk3MjAzYTBmYjIyNzc4ZmFmMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODEzMjU2M30.JhQaUrq8woPnyRXwrw2gV70HtwhP3XcIhsAlzj1i10w"
//     const token = authToken;
//     try{

//     const formData = new FormData();
//     formData.append("media[status]", "true");
//     for (const recording of audioRecordings) {
//       const blob = await audioRecordingToBlob(recording);
//       formData.append('media[record]', blob, recording.name);
//     }

//     const response = await axios.put(`${BASE_URL}/user/incident-type/683650cccdfa52a1340ff3de`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data"
//       }

//     });
//     console.log("response is here for additional details:: ", response.data)

//   }catch(error){
//     console.log("Error in additional details is  :: ", error)
//   }
// }

const handleAPICall = async () => {
  const token = authToken;

  try {
    const formData = new FormData();
    formData.append("media[status]", "true");

    for (const recording of audioRecordings) {
      formData.append('media[record][]', {
        uri: recording.uri,
        type: 'audio/x-wav', // or 'audio/m4a', adjust based on your recorder output
        name: recording.name,
      });
    }

    const response = await axios.put(
      `${BASE_URL}/user/incident-type/${incidentId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      console.log("Media files saved successfully");
      setAudioRecordings([]);
      Alert.alert("Success", "Media files saved successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }

    console.log("response is here for additional details:: ", response.data);
  } catch (error) {
    console.log("Error in additional details is  :: ", error.response?.data || error.message);
  }
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
          {audioRecordings.length > 0 && (
            <View style={styles.recordingsList}>
              {audioRecordings.map((recording, index) => (
                <View key={index} style={styles.recordingItem}>
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
          )}
        </View>

        {/* Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Images</Text>
          <ImageUploader incidentId={incidentId} authToken={authToken} />
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
});

export default MediaFiles;