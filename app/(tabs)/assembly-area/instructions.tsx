import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CrossImage from '../../../assets/images/cross.png';
import EditImage from '../../../assets/images/edit.png';
import FireImage from '../../../assets/images/fire.png';
import MediaImage from '../../../assets/images/media.png';
import TickImage from '../../../assets/images/tick.png';
import WheelChairImage from '../../../assets/images/wheelchair.png';
import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import ValidationModal from '../../../components/ValidationModal';
import { BASE_URL } from '../../../config';
import { useAuth } from '../../../context/AuthContext';
import { useFormData } from '../../../context/FormDataContext';



interface AudioRecording {
  uri: string;
  name: string;
  timestamp: Date;
  duration: number;
}

const Instructions = () => {
  const { incidentId } = useLocalSearchParams();
  const router = useRouter();
  const { authState } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selections, setSelections] = useState({
    allClear: false,
    refusals: false,
    personWithDisability: false,
    signOfDanger: false,
  });
  const {
    refusalsData,
    setRefusalsData,
    personWithDisabilityData,
    setPersonWithDisabilityData,
    signOfDangerData,
    setSignOfDangerData,
    additionalDetails,
    setAdditionalDetails,
    audioRecordings,
    setAudioRecordings,
    images,
    setImages,
    clearData,
  } = useFormData();

  // const [refusalsData, setRefusalsData] = useState({ noOfRefusals: '', location: '' });
  // const [personWithDisabilityData, setPersonWithDisabilityData] = useState({noOfPersonWithDisability: '', descriptionAndLocation: ''});
  // const [signOfDangerData, setSignOfDangerData] = useState({signOfDanger: ''});
  // const [additionalDetails, setAdditionalDetails] = useState({notes: ''});
  // const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);

  const canSubmit = selections.allClear === true || 
    (selections.refusals !== null && selections.personWithDisability !== null && selections.signOfDanger !== null);

  const handleButtonPress = (section: string, value: boolean) => {
    if (section === 'allClear' && value) {
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
        ...(section !== 'allClear' && { allClear: false })
      }));

      if (value && section !== 'allClear') {
        const navigationMap = {
          // refusals: () => navigation.navigate('Refusals', {
          //   data: refusalsData,
          //   setData: setRefusalsData,
          //   onComplete: () => {}
          // }),
          refusals: () => router.push('/(tabs)/assembly-area/refusals'),

          // personWithDisability: () => navigation.navigate('PersonWithDisability', {
          //   data: personWithDisabilityData,
          //   setData: setPersonWithDisabilityData,
          //   onComplete: () => {}
          // }),
          personWithDisability: () => router.push('/(tabs)/assembly-area/person-with-disability'),
          // signOfDanger: () => router.push('SignOfDanger', {
          //   data: signOfDangerData,
          //   setData: setSignOfDangerData,
          //   onComplete: () => {}
          // })
          signOfDanger: () => router.push('/(tabs)/assembly-area/sign-of-danger'),
        };
        navigationMap[section]?.();
      }
    }
  };

  const handleSubmit = async () => {
    // console.log("Audio Recordings:", audioRecordings)
    // console.log("sign of dangerrrrr : ", signOfDangerData)
    console.log("Imagea arege :: ", images)
    
    setIsSubmitting(true);
    const token = authState.authToken;
    const formData = new FormData();

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

    // Convert audio recordings to Blob and append to FormData
    if (audioRecordings.length > 0) {
      try {
        const promises = audioRecordings.map(async (recording) => {
          try {
            const response = await fetch(recording.uri);
            const blob = await response.blob();
            formData.append('media[record][]', blob, recording.name);
          } catch (error) {
            console.error(`Error processing recording ${recording.name}:`, error);
            throw error;
          }
        });
        await Promise.all(promises);
      } catch (error) {
        console.error('Error processing audio recordings:', error);
        Alert.alert('Error', 'Failed to process audio recordings');
        return;
      }
    }

    try {
      for (const image of images) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        formData.append('media[image][]', blob, image.uri.split('/').pop());
      }
    } catch (error) {
      console.error('Error processing images:', error);
    }

    try {
      const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
      
        console.log("\n\n\n\n Response of the appppiiii  : ", response.data)
        setIsModalVisible(true);
        clearData();
      } else {
        Alert.alert('Error', `Server responded with status ${response.status}`);
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
      onPress: () => router.push('/(tabs)/assembly-area/additional-details')
    },
    {
      title: 'Media Files',
      image: MediaImage,
      // onPress: () => navigation.navigate('MediaFiles', {
      //   data: { audioRecordings },
      //   setData: setAudioRecordings,
      //   onComplete: () => {},
      //   incidentId: incidentId
      // })
      onPress: () => router.push('/(tabs)/assembly-area/media-files')
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

        <ValidationModal 
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