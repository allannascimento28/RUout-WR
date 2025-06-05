import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";


const SignOfDanger = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const {authToken} = useAuth();
  const incidentId = route.params?.incidentId;
  const [signOfDanger, setSignOfDanger] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignOfDanger = (text: string) => {
    setSignOfDanger(text);
    setErrorMessage('');
  }

  const handleAPICall =async () => {
    const token = authToken;
    try{

    const formData = new FormData();
    formData.append("sign_of_danger[status]", "true");
    formData.append("sign_of_danger[sign_of_danger]", signOfDanger);     


    const response = await axios.put(`${BASE_URL}/user/incident-type/${incidentId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }

    });
    if( response.status === 200) {
      console.log("Sign of danger saved successfully");
      setSignOfDanger('');
      setErrorMessage('');
      Alert.alert("Success", "Sign of danger saved successfully", [
        { text: "OK", onPress: () => {
          navigation.goBack()
        }}
      ]);
    }
    console.log("response is here for danger:: ", response.data)
    

    }catch(error){
      console.log("Error in refusal is  :: ", error)
    }
  }

  const handleSave = () => {
    if (signOfDanger.trim() === '') {
      setErrorMessage('Please enter danger description');
      return;
    }
    // Keyboard.dismiss();
    handleAPICall();
    console.log("handle save: ", signOfDanger);
  }

    const headerHeight = 60;


    return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + 20 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <CustomHeader title="Sign of Danger" />

          <View style={styles.contentContainer}>
            <CustomInput
              label="Sign of Danger Description"
              placeholder="Fire in kitchen"
              numberOfLines={4}
              value={signOfDanger}
              onChangeText={handleSignOfDanger}
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

export default SignOfDanger;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        paddingHorizontal: 16,
    },
    buttonContainer: {
        padding: 16,
        marginBottom: 16
    },
})
