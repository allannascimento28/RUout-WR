import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomShareButton from '../components/CustomShareButton';
import ExecuteImage from '../assets/execute.png';
import { LinearGradient } from 'expo-linear-gradient';

const EvacuateNow = () => {
  return (
    <LinearGradient
      colors={['#dc2626', '#be1212']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={ExecuteImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>EVACUATE NOW</Text>

        <CustomShareButton onPress={() => {}} />
      </View>
    </LinearGradient>
  );
};

export default EvacuateNow;

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
