import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const AdditionalDetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const {data, setData, onComplete } = route.params;
 
  const [notes, setNotes] = useState<string>('');
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
    setData({ notes });
    onComplete?.();
    navigation.goBack();
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
