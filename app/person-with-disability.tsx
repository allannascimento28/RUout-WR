import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useFormData } from "../context/FormDataContext";
import { useRouter } from "expo-router";

const PersonWithDisability = () => {
  // const {data, setData, onComplete } = route.params;
  const router = useRouter();
  const {personWithDisabilityData, setPersonWithDisabilityData} = useFormData();

  const [noOfPersonWithDisability, setNoOfPersonWithDisability] = useState(personWithDisabilityData.noOfPersonWithDisability ||'');
  const [descriptionAndLocation, setDescriptionAndLocation] = useState(personWithDisabilityData.descriptionAndLocation || '');
  const [noOfPersonError, setNoOfPersonError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');


  const handleNoOfPersonWithDisability = (text) => {
    setNoOfPersonWithDisability(text);
    setNoOfPersonError('');
  }

  const handleDescriptionAndLocation = (text) => {
    setDescriptionAndLocation(text);
    setDescriptionError('');
  }

  const handleValidate = () => {
    let isValid = true;

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

    if (descriptionAndLocation.trim() === '') {
      setDescriptionError('Please enter description and location');
      isValid = false;
    }

    return isValid;
  }

  const handleSave = () => {
    if (!handleValidate()) return;

      setPersonWithDisabilityData({ noOfPersonWithDisability, descriptionAndLocation });
      router.back();
      console.log("No. of Person with Disability:", parseInt(noOfPersonWithDisability, 10));
      console.log("Description and Location:", descriptionAndLocation);
      Keyboard.dismiss(); 
    
  }


  const headerHeight = 60; 

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
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.innerTouchableContainer}>
              <View style={styles.contentContainer}>
                <CustomInput
                  label="No. of Person With Disability"
                  placeholder="2"
                  value={noOfPersonWithDisability}
                  onChangeText={handleNoOfPersonWithDisability}
                  keyboardType="numeric"
                  errorMessage={noOfPersonError}
                />

                <CustomInput
                  label="Description and Location"
                  placeholder="fire stairs"
                  numberOfLines={6}
                  value={descriptionAndLocation}
                  onChangeText={handleDescriptionAndLocation}
                  multiline={true}
                  errorMessage={descriptionError}
                />
              </View>
            </View>
          {/* </TouchableWithoutFeedback> */}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="SAVE"
            onPress={handleSave}
          />
        </View>
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
    flex: 1,
    position: 'absolute',
    bottom: 32,
    padding: 16,
    width: '100%',
  },
});