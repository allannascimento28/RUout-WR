import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import ThankYouModal from '../components/ValidationModal';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import { RootStackNavigation } from '../navigation/types';

import TickImage from '../assets/images/tick.png';
import CrossImage from '../assets/images/cross.png';
import WheelChairImage from '../assets/images/wheelchair.png';
import FireImage from '../assets/images/fire.png';
import EditImage from '../assets/images/edit.png';
import MediaImage from '../assets/images/media.png';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

interface AudioRecording {
  uri: string;
  name: string;
  timestamp: Date;
  duration: number;
}

const Instructions = ({ route }: { route: any }) => {
  const navigation = useNavigation<RootStackNavigation>();
  const incidentId = route.params?.incidentId;
  const { authState } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple state for button selections
  const [selections, setSelections] = useState({
    allClear: null, // null, true, false
    refusals: null,
    personWithDisability: null,
    signOfDanger: null,
  });

  // Data states
  const [refusalsData, setRefusalsData] = useState({ noOfRefusals: '', location: '' });
  const [personWithDisabilityData, setPersonWithDisabilityData] = useState({noOfPersonWithDisability: '', descriptionAndLocation: ''});
  const [signOfDangerData, setSignOfDangerData] = useState({signOfDanger: ''});
  const [additionalDetails, setAdditionalDetails] = useState({notes: ''});
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);

  // Check if form can be submitted
  const canSubmit = selections.allClear === true || 
    (selections.refusals !== null && selections.personWithDisability !== null && selections.signOfDanger !== null);

  const handleButtonPress = (section: string, value: boolean) => {
    if (section === 'allClear' && value) {
      // If All Clear is Yes, set all to No
      setSelections({
        allClear: true,
        refusals: false,
        personWithDisability: false,
        signOfDanger: false,
      });
    } else {
      setSelections(prev => ({
        ...prev,
        [section]: value,
        // If any other section is changed, clear All Clear
        ...(section !== 'allClear' && { allClear: false })
      }));

      // Navigate to screens if Yes is selected
      if (value && section !== 'allClear') {
        const navigationMap = {
          refusals: () => navigation.navigate('Refusals', {
            data: refusalsData,
            setData: setRefusalsData,
            onComplete: () => {}
          }),
          personWithDisability: () => navigation.navigate('PersonWithDisability', {
            data: personWithDisabilityData,
            setData: setPersonWithDisabilityData,
            onComplete: () => {}
          }),
          signOfDanger: () => navigation.navigate('SignOfDanger', {
            data: signOfDangerData,
            setData: setSignOfDangerData,
            onComplete: () => {}
          })
        };
        navigationMap[section]?.();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = authState.authToken;
    const formData = new FormData();

    // Build form data based on selections
    formData.append('refusal[status]', selections.refusals ? 'true' : 'false');
    if (selections.refusals) {
      formData.append('refusal[no_of_refusal]', refusalsData.noOfRefusals);
      formData.append('refusal[location]', refusalsData.location);
    }

    formData.append('disability[status]', selections.personWithDisability ? 'true' : 'false');
    if (selections.personWithDisability) {
      formData.append('disability[no_of_person]', personWithDisabilityData.noOfPersonWithDisability);
      formData.append('disability[description]', personWithDisabilityData.descriptionAndLocation);
    }

    formData.append('sign_of_danger[status]', selections.signOfDanger ? 'true' : 'false');
    if (selections.signOfDanger) {
      formData.append('sign_of_danger[sign_of_danger]', signOfDangerData.signOfDanger);
    }

    formData.append('additional[status]', 'true');
    formData.append('additional[notes]', additionalDetails.notes);

    formData.append("media[status]", audioRecordings.length > 0 ? "true" : "false");
    for (const recording of audioRecordings) {
      formData.append('media[record][]', {
        uri: recording.uri,
        type: 'audio/x-wav',
        name: recording.name,
      });
    }

    try {
      const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setIsModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to submit');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Something went wrong during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonItems = [
    { key: 'allClear', title: 'All Clear', image: TickImage },
    { key: 'refusals', title: 'Refusals', image: CrossImage },
    { key: 'personWithDisability', title: 'Person with a Disability', image: WheelChairImage },
    { key: 'signOfDanger', title: 'Is there any Sign of Danger?', image: FireImage },
  ];

  const listItems = [
    {
      title: 'Additional Details and Requests',
      image: EditImage,
      onPress: () => navigation.navigate('AdditionalDetails', {
        data: additionalDetails,
        setData: setAdditionalDetails,
        onComplete: () => {}
      })
    },
    {
      title: 'Media Files',
      image: MediaImage,
      onPress: () => navigation.navigate('MediaFiles', {
        data: audioRecordings,
        setData: setAudioRecordings,
        onComplete: () => {}
      })
    },
  ];

  return (
    <View style={styles.screen}>
      <CustomHeader title="Level 1 South 1" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {buttonItems.map((item) => {
          const selection = selections[item.key];
          const yesSelected = selection === true;
          const noSelected = selection === false;
          
          return (
            <View style={styles.container} key={item.key}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() => handleButtonPress(item.key, true)}
                  style={[
                    styles.yesButton,
                    { backgroundColor: yesSelected ? '#FF1C1C' : '#fe8d8d' },
                    noSelected && styles.disabledButton
                  ]}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleButtonPress(item.key, false)}
                  style={[
                    styles.noButton,
                    noSelected && styles.activeNoButton
                  ]}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {listItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.belowContainer}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="caret-right" size={20} color="black" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.submitButton}>
          <CustomButton 
            title="SUBMIT"
            onPress={handleSubmit} 
            disabled={isSubmitting || !canSubmit}
            loading={isSubmitting}
          />
        </View>

        <ThankYouModal 
          visible={isModalVisible} 
          onClose={() => setIsModalVisible(false)} 
          onDownload={() => setIsModalVisible(false)} 
          navigation={() => {}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 13,
  },
  belowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    borderRadius: 3,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Manrope-Bold',
    color: '#363636',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  yesButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#34C75980',
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  activeNoButton: {
    backgroundColor: '#34C759',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Manrope-Bold',
  },
  submitButton: {
    marginTop: 24,
  },
});

export default Instructions;