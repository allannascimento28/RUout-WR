import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView, // Import ScrollView
  StatusBar,
  Alert, // For potential StatusBar height if needed for offset
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const PersonWithDisability = ({ navigation, route }: { navigation: any, route: any }) => {
  const {authToken} = useAuth();
  const incidentId = route.params?.incidentId;
  const [noOfPersonWithDisability, setNoOfPersonWithDisability] = useState('');
  const [descriptionAndLocation, setDescriptionAndLocation] = useState('');
  const [noOfPersonError, setNoOfPersonError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  console.log("here is incddd id :  ", incidentId)

  const handleNoOfPersonWithDisability = (text) => {
    setNoOfPersonWithDisability(text);
    setNoOfPersonError(''); // Clear error on change
  }

  const handleDescriptionAndLocation = (text) => {
    setDescriptionAndLocation(text);
    setDescriptionError(''); // Clear error on change
  }

  const handleValidate = () => {
    let isValid = true;

    // Validate No. of Person With Disability
    if (noOfPersonWithDisability.trim() === '') {
      setNoOfPersonError('Please enter the number of persons');
      isValid = false;
    } else {
      const num = parseInt(noOfPersonWithDisability, 10);
      if (isNaN(num) || num < 0) {
        setNoOfPersonError('Please enter a valid non-negative number');
        isValid = false;
      }
    }

    // Validate Description and Location
    if (descriptionAndLocation.trim() === '') {
      setDescriptionError('Please enter description and location');
      isValid = false;
    }

    return isValid;
  }

  const handleSave = () => {
    if (handleValidate()) {
      console.log("No. of Person with Disability:", parseInt(noOfPersonWithDisability, 10));
      console.log("Description and Location:", descriptionAndLocation);
      Keyboard.dismiss(); // Dismiss keyboard on successful save
      handleAPICall();
    }
  }

  const handleAPICall =async () => {
    const token = authToken;
    try{

    const formData = new FormData();
    formData.append("disability[status]", "true");
    formData.append("disability[no_of_person]", noOfPersonWithDisability);     
    formData.append("disability[description]", descriptionAndLocation);


    const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }

    });

    if( response.status === 200) {
      console.log("Person with disability details saved successfully");
      setNoOfPersonWithDisability('');
      setDescriptionAndLocation('');
      setNoOfPersonError('');
      setDescriptionError('');
      Alert.alert("Success", "Person with disability details saved successfully", [
        { text: "OK", onPress: () => {
          navigation.goBack();
        }}
      ]);
    }
    console.log("response is here:: ", response.data)

    }catch(error){
      console.log("Error in refusal is  :: ", error)
    }
  }

  const headerHeight = 60; // A common estimate for a header height

  return (
    <View style={styles.outerContainer}>
      <CustomHeader title="Person With Disability" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerTouchableContainer}>
              <View style={styles.contentContainer}>
                <CustomInput
                  label="No. of Person With Disability"
                  placeholder="2"
                  value={noOfPersonWithDisability}
                  onChangeText={handleNoOfPersonWithDisability}
                  keyboardType="numeric" // Set keyboard type to numeric
                  errorMessage={noOfPersonError}
                />

                <CustomInput
                  label="Description and Location"
                  placeholder="fire stairs"
                  numberOfLines={6}
                  value={descriptionAndLocation}
                  onChangeText={handleDescriptionAndLocation}
                  multiline={true} // Explicitly set multiline to true
                  errorMessage={descriptionError}
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton title="SAVE" onPress={handleSave} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default PersonWithDisability;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  innerTouchableContainer: {
    flex: 1,
    minHeight: 400,
  },
  contentContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});