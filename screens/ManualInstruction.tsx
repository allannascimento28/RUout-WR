import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomShareButton from '../components/CustomShareButton';
import ManualImage from '../assets/manual.png';
import { LinearGradient } from 'expo-linear-gradient';

const ManualInstruction = () => {
  return (
    <LinearGradient
      colors={['#7c3aed', '#4c1d95']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={ManualImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>MANUAL INSTRUCTION</Text>

        <CustomShareButton onPress={() => {}} />
      </View>
    </LinearGradient>
  );
};

export default ManualInstruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(24),
  },
  image: {
    width: scale(200),
    height: verticalScale(200),
  },
  heading: {
    fontSize: moderateScale(32),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },

});
