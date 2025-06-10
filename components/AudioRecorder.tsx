import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

interface AudioRecorderProps {
  onClose: () => void;
  onSave: (uri: string, duration: number) => void;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  micContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '45%',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#BFDBFE',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#374151',
  },
});

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onClose, onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Audio recording permission is required to use this feature.');
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to request audio permissions');
      return false;
    }
  };

  const startRecording = async () => {
    try {
      const permission = await requestPermissions();
      if (!permission) {
        return;
      }

      console.log('Starting recording...');
      recordingRef.current = new Audio.Recording();
      await recordingRef.current.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recordingRef.current.startAsync();
      
      setIsRecording(true);
      setDuration(0);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Could not start recording');
      console.error('Start recording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      // Stop recording but keep it loaded
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      
      if (uri) {
        console.log('Recording URI:', uri); // Debug log
        setAudioURI(uri);
        setDuration(duration);
      }

      // Clean up
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not stop recording');
      console.error('Stop recording error:', error);
    }
  };

  const save = () => {
    try {
      if (!audioURI) {
        Alert.alert('Error', 'No recording to save');
        return;
      }

      // Unload the recording now that we're saving it
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      // Save the recording
      onSave(audioURI, duration);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save recording');
      console.error('Save error:', error);
    }
  };

  const togglePlayback = async () => {
    try {
      if (!audioURI) return;

      if (isPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlaying(false);
      } else {
        if (soundRef.current) {
          await soundRef.current.playAsync();
        } else {
          const { sound } = await Audio.Sound.createAsync(
            { uri: audioURI },
            { shouldPlay: true }
          );
          soundRef.current = sound;
          
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying || false);
              if (status.didJustFinish) {
                setIsPlaying(false);
              }
            }
          });
        }
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not play audio');
      console.error('Playback error:', error);
    }
  };

  const cancel = () => {
    if (isRecording) {
      stopRecording();
    }
    setIsRecording(false);
    setAudioURI(null);
    setDuration(0);
    onClose();
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={cancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Audio Recorder</Text>

          {/* Mic Display */}
          <View style={styles.micContainer}>
            <Ionicons 
              name="mic" 
              size={64} 
              color={isRecording ? "#F9980D" : "#D1D5DB"} 
            />
          </View>

          {/* Timer */}
          <Text style={styles.timer}>{formatTime(duration)}</Text>

          {/* Control Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              if (!audioURI) {
                isRecording ? stopRecording() : startRecording();
              } else {
                togglePlayback();
              }
            }}
          >
            <Ionicons 
              name={
                !audioURI 
                  ? (isRecording ? "pause-circle" : "play-circle")
                  : (isPlaying ? "pause-circle" : "play-circle")
              } 
              size={56} 
              color="#6B7280" 
            />
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, !audioURI && styles.disabledButton]}
              onPress={save}
              disabled={!audioURI}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancel}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AudioRecorder;