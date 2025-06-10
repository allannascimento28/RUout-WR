import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const Refusals = ({ route, navigation }) => {
  const {data, setData, onComplete } = route.params;

  const [noOfRefusals, setNoOfRefusals] = useState(data.noOfRefusals || '');
  const [location, setLocation] = useState(data.location || '');
  const [noOfRefusalsError, setNoOfRefusalsError] = useState('');
  const [locationError, setLocationError] = useState('');

  const validate = () => {
    let isValid = true;
    if (!noOfRefusals.trim()) {
      setNoOfRefusalsError('Enter number of refusals');
      isValid = false;
    }
    if (!location.trim()) {
      setLocationError('Enter location');
      isValid = false;
    }
    return isValid;
  };

  const handleSave = () => {
    if (!validate()) return;
    setData({ noOfRefusals, location });
    onComplete?.();
    navigation.goBack();
  };

  return (
    <View style={styles.outerContainer}>
      <CustomHeader title="Refusals" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
              <CustomInput
                label="No. of Refusals"
                placeholder="2"
                value={noOfRefusals}
                onChangeText={text => {
                  setNoOfRefusals(text);
                  setNoOfRefusalsError('');
                }}
                keyboardType="numeric"
                errorMessage={noOfRefusalsError}
              />
              <CustomInput
                label="Location"
                placeholder="Toilet"
                value={location}
                onChangeText={text => {
                  setLocation(text);
                  setLocationError('');
                }}
                multiline
                numberOfLines={4}
                errorMessage={locationError}
              />
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton title="SAVE" onPress={handleSave} />
        </View>
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
    padding: 16,
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 32,
    padding: 16,
    width: '100%',
  },
});


