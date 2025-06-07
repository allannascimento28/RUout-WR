
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
  const { authToken } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [refusalsData, setRefusalsData] = useState({ noOfRefusals: '', location: '' });
  const [personWithDisabilityData, setPersonWithDisabilityData] = useState({noOfPersonWithDisability: '', descriptionAndLocation: ''});
  const [signOfDangerData, setSignOfDangerData] = useState({signOfDanger: ''});
  const [additionalDetails, setAdditionalDetails] = useState({notes: ''});
  const [mediaFiles, setMediaFiles] = useState([]);
   const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);

  const [completedSections, setCompletedSections] = useState({
    refusals: false,
    personWithDisability: false,
    signOfDanger: false,
    additionalDetails: false,
    audioRecordings: false,
  });

  const markComplete = (key: keyof typeof completedSections) =>
    setCompletedSections(prev => ({ ...prev, [key]: true }));

  const handleSubmit = async () => {
    const token = authToken;
    const formData = new FormData();

    formData.append('refusal[status]', 'true');
    formData.append('refusal[no_of_refusal]', refusalsData.noOfRefusals);
    formData.append('refusal[location]', refusalsData.location);

    formData.append('disability[status]', 'true');
    formData.append('disability[no_of_person]', personWithDisabilityData.noOfPersonWithDisability);
    formData.append('disability[description]', personWithDisabilityData.descriptionAndLocation);

    formData.append('sign_of_danger[status]', 'true');
    formData.append('sign_of_danger[sign_of_danger]', signOfDangerData.signOfDanger);

    formData.append('additional[status]', 'true');
    formData.append('additional[notes]', additionalDetails.notes);

    formData.append("media[status]", "true");

    for (const recording of audioRecordings) {
      formData.append('media[record][]', {
        uri: recording.uri,
        type: 'audio/x-wav', // or 'audio/m4a', adjust based on your recorder output
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
        console.log("Response :: ", response.data)
        setIsModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to submit');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Something went wrong during submission');
    }
  };

  const buttonItems = [
    {
      title: 'All Clear',
      image: TickImage,
      onPress: () => {}, // dummy
      colour: '#FF1C1C',
    },
    {
      title: 'Refusals',
      image: CrossImage,
      onPress: () =>
        navigation.navigate('Refusals', {
          data: refusalsData,
          setData: setRefusalsData,
          onComplete: () => markComplete('refusals'),
        }),
      colour: completedSections.refusals ? '#FF0000' : '#fe8d8d',
    },
    {
      title: 'Person with a Disability',
      image: WheelChairImage,
      onPress: () =>
        navigation.navigate('PersonWithDisability', {
          data: personWithDisabilityData,
          setData: setPersonWithDisabilityData,
          onComplete: () => markComplete('personWithDisability'),
        }),
      colour: completedSections.personWithDisability ? '#FF0000' : '#fe8d8d',
    },
    {
      title: 'Is there any Sign of Danger?',
      image: FireImage,
      onPress: () =>
        navigation.navigate('SignOfDanger', {
          data: signOfDangerData,
          setData: setSignOfDangerData,
          onComplete: () => markComplete('signOfDanger'),
        }),
      colour: completedSections.signOfDanger ? '#FF0000' : '#fe8d8d',
    },
  ];

  const listItem = [
    {
      title: 'Additional Details and Requests',
      image: EditImage,
      route: 'AdditionalDetails',
      completeKey: 'additionalDetails',
      setData: setAdditionalDetails,
      data: additionalDetails,
    },
    {
      title: 'Media Files',
      image: MediaImage,
      route: 'MediaFiles',
      completeKey: 'audioRecordings',
      setData: setAudioRecordings,
      data: audioRecordings,
    },
  ];

  return (
    <View style={styles.screen}>
      <CustomHeader title="Level 1 South 1" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {buttonItems.map((item, index) => (
          <View style={styles.container} key={index}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={item.onPress}
                style={[styles.yesButton, { backgroundColor: item.colour }]}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {listItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(item.route, {
                data: item.data,
                setData: item.setData,
                onComplete: () => markComplete(item.completeKey),
              })
            }
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
          <CustomButton title="SUBMIT" onPress={handleSubmit} />
        </View>

        <ThankYouModal 
          visible={isModalVisible} 
          onClose={() => setIsModalVisible(false)} 
          onDownload={() => setIsModalVisible(false)} 
        //   navigation={navigation} 
        navigation={() =>{}}
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

