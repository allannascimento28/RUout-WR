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

const styles = StyleSheet.create({

  overlay: {

    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.4)',

    alignItems: 'center',

    justifyContent: 'center',

  },

  container: {

    backgroundColor: 'white',

    borderRadius: 12,

    padding: 24,

    width: 320,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.25,

    shadowRadius: 8,

    elevation: 8,

  },

  title: {

    fontSize: 18,

    fontWeight: '600',

    marginBottom: 16,

    color: '#1F2937',

  },

  micContainer: {

    marginBottom: 16,

  },

  timer: {

    fontSize: 18,

    fontFamily: 'monospace',

    marginBottom: 24,

    color: '#1F2937',

  },

  controlButton: {

    marginBottom: 24,

    backgroundColor: '#F3F4F6',

    borderRadius: 40,

    width: 80,

    height: 80,

    alignItems: 'center',

    justifyContent: 'center',

  },

  actionButtons: {

    flexDirection: 'row',

    gap: 16,

    width: '100%',

  },

  button: {

    flex: 1,

    paddingVertical: 12,

    borderRadius: 25,

    alignItems: 'center',

  },

  saveButton: {

    backgroundColor: '#BFDBFE',

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

    color: '#6B7280',

  },

  cancelButtonText: {

    color: '#374151',

  },

});

