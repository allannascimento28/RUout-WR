import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import CustomHeader from "../../../components/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { useFormData } from "../../../context/FormDataContext";
import { useRouter } from "expo-router";

const AdditionalDetails = () => {
  const router = useRouter();
  const {additionalDetails, setAdditionalDetails} = useFormData();
 
  const [notes, setNotes] = useState<string>(additionalDetails.notes || '');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleNotes = (text: string) => {
    setNotes(text);
    setErrorMessage('');
  }


  const handleSave = () => {
    if (notes.trim() === '') {
      setErrorMessage('Please enter notes');
      return;
    }
    setAdditionalDetails({ notes });
    router.back();
    console.log("handle save: ", notes);
  }

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
          <View style={styles.screen}>
            <CustomHeader title="Additional Details and Requests" />
            <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardDismissMode="on-drag"
            >
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

            </ScrollView>
          </View>
      </KeyboardAvoidingView>
    )
}

export default AdditionalDetails;

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 16,
  },
  contentContainer: {
      flex: 1,
      padding: 16
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
      padding: 16,
      marginBottom: 16
  },
})
