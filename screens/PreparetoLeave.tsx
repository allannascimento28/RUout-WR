import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomShareButton from '../components/CustomShareButton';
import PrepareImage from '../assets/prepare.png';
import { LinearGradient } from 'expo-linear-gradient';

const PreparetoLeave = () => {
  return (
    <LinearGradient
      colors={['#fbbf24', '#f59e0b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={PrepareImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>PREPARE TO {"\n"}LEAVE</Text>

        <CustomShareButton onPress={() => {}} />
      </View>
    </LinearGradient>
  );
};

export default PreparetoLeave;

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
