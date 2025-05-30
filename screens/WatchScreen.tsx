import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';

const WatchScreen = () => {
  const navigation = useNavigation<RootStackNavigation>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        // onPress={() => navigation.navigate('SafeAtWork')}
        // onPress={() => navigation.navigate('EvacuateNow')}
        //onPress={() => navigation.navigate('ShelterInPlace')}
        onPress={() => navigation.navigate('ManualInstruction')}
        // onPress={() => navigation.navigate('PreparetoLeave')}
      >
        <Text style={styles.buttonText}>Watch</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3392CC',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WatchScreen;