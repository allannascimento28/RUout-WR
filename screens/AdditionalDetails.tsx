import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const AdditionalDetails = ({ navigation, route }: { navigation: any, route: any }) => {

  const {authToken} = useAuth();
  const incidentId = route.params?.incidentId;
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleNotes = (text: string) => {
    setNotes(text);
    setErrorMessage('');
  }

  const handleAPICall =async () => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzI1NTk3MjAzYTBmYjIyNzc4ZmFmMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODEzMjU2M30.JhQaUrq8woPnyRXwrw2gV70HtwhP3XcIhsAlzj1i10w"
    const token = authToken;
    try{

    const formData = new FormData();
    formData.append("additional[status]", "true");
    formData.append("additional[notes]", notes);     


    const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }

    });

    if( response.status === 200) {
      console.log("Additional details saved successfully");
      setNotes('');
      setErrorMessage('');
      Alert.alert("Success", "Additional details saved successfully", [
        { text: "OK", onPress: () => {
          navigation.goBack()
        }}
      ]);
    }
    console.log("response is here for additional details:: ", response.data)

    }catch(error){
      console.log("Error in additional details is  :: ", error)
    }
  }

  const handleSave = () => {
    if (notes.trim() === '') {
      setErrorMessage('Please enter notes');
      return;
    }
    // Keyboard.dismiss();
    handleAPICall();
    console.log("handle save: ", notes);
  }

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <CustomHeader title="Additional Details and Requests" />
  
            <View style={styles.contentContainer}>
              <CustomInput
                label="Notes"
                placeholder="Need Ambulance"
                numberOfLines={4}
                value={notes}
                onChangeText={handleNotes}
                errorMessage={errorMessage}
              />
            </View>
  
            <View style={styles.buttonContainer}>
              <CustomButton title="SAVE" onPress={handleSave} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

export default AdditionalDetails;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(16),
    },
    contentContainer: {
        flex: 1,
        padding: scale(16)
    },
    buttonContainer: {
        padding: scale(16),
        marginBottom: scale(16)
    },
})
