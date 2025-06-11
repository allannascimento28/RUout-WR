import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";


const SignOfDanger = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const {data, setData, onComplete } = route.params;

  const [signOfDanger, setSignOfDanger] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignOfDanger = (text: string) => {
    setSignOfDanger(text);
    setErrorMessage('');
  }

  const handleSave = () => {
    if (signOfDanger.trim() === '') {
      setErrorMessage('Please enter danger description');
      return;
    }

    setData({ signOfDanger });
    onComplete?.();
    navigation.goBack();
    console.log("handle save: ", signOfDanger);
  }

    const headerHeight = 60;


    return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + 20 : 0}
    >
        <View style={styles.screen}>
          <CustomHeader title="Sign of Danger" />

          <ScrollView
           contentContainerStyle={styles.scrollViewContent} // Use contentContainerStyle
            keyboardDismissMode="on-drag"
          >
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
          </ScrollView>
        </View>
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
    scrollViewContent: {
        flexGrow: 1,
    },
    buttonContainer: {
        padding: 16,
        marginBottom: 16
    },
})
