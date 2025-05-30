import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomShareButton from '../components/CustomShareButton';
import TickImage from '../assets/tick.png';
import { LinearGradient } from 'expo-linear-gradient';

const SafeAtWork = () => {
  return (
    <LinearGradient
      colors={['#4ab14f', '#1d5d21']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={TickImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>SAFE AT WORK</Text>

        <CustomShareButton onPress={() => {}} />
      </View>
    </LinearGradient>
  );
};

export default SafeAtWork;

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
