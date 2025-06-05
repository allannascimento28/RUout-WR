import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  Alert
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

const Refusals = ({ navigation, route }: { navigation: any, route: any }) => {
  const {authToken} = useAuth();
  const incidentId = route.params?.incidentId;
  const [noOfRefusals, setNoOfRefusals] = useState('');
  const [location, setLocation] = useState('');
  const [noOfRefusalsError, setNoOfRefusalsError] = useState('');
  const [locationError, setLocationError] = useState('');

  console.log("incidentId in refusalss :: ", incidentId)

  const handleNoOfRefusals = (text) => {
    setNoOfRefusals(text);
    setNoOfRefusalsError('');
  };

  const handleLocation = (text) => {
    setLocation(text);
    setLocationError('');
  };

  const handleValidate = () => {
    let isValid = true;

    if (noOfRefusals.trim() === '') {
      setNoOfRefusalsError('Please enter the number of refusals');
      isValid = false;
    } else {
      const num = parseInt(noOfRefusals, 10);
      if (isNaN(num) || num < 0) {
        setNoOfRefusalsError('Please enter a valid non-negative number');
        isValid = false;
      }
    }

    if (location.trim() === '') {
      setLocationError('Please enter the location');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = () => {
    if (handleValidate()) {
      console.log("No. of Refusals:", parseInt(noOfRefusals, 10));
      console.log("Location:", location);
      Keyboard.dismiss();
      handleAPICall()
    }
  };

  const handleAPICall =async () => {
    const token = authToken;
    try{

    const formData = new FormData();
    formData.append("refusal[status]", "true");
    formData.append("refusal[no_of_refusal]", noOfRefusals);     
    formData.append("refusal[location]", location);


    const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }

    });

    if (response.status === 200) {
      console.log("Refusal data saved successfully");
      setNoOfRefusals('');
      setLocation('');
      setNoOfRefusalsError('');
      setLocationError('');
      Alert.alert("Success", "Refusal data saved successfully", [
        { text: "OK", onPress: () => {
          navigation.goBack()
        }}
      ]);
    } else {
      console.log("Failed to save refusal data");
    }
    console.log("response is :: ", response.data)

    }catch(error){
      console.log("Error in refusal is  :: ", error)
    }
  }

  const headerHeight = 60;

  return (
    <View style={styles.outerContainer}>
      <CustomHeader title="Refusals" />
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
                  label="No. of Refusals"
                  placeholder="2"
                  value={noOfRefusals}
                  onChangeText={handleNoOfRefusals}
                  keyboardType="numeric"
                  errorMessage={noOfRefusalsError}
                />
                <CustomInput
                  label="Location"
                  placeholder="Toilet"
                  numberOfLines={4}
                  value={location}
                  onChangeText={handleLocation}
                  multiline={true}
                  errorMessage={locationError}
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
  );
};

export default Refusals;

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