import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, Platform, StatusBar } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomShareButton from './CustomShareButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface InstructionScreenProps {
  gradientColors: string[];
  image: ImageSourcePropType;
  title: string;
  nextScreen: keyof RootStackParamList;
  allowLineBreak?: boolean;
}

const InstructionScreen: React.FC<InstructionScreenProps> = ({ 
  gradientColors, 
  image, 
  title, 
  nextScreen,
  allowLineBreak = false
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formattedTitle = allowLineBreak ? title : title;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top-left Cancel Button */}
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      {/* Top-right Next Button */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate(nextScreen)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>{formattedTitle}</Text>

        <CustomShareButton onPress={() => {}} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: Platform.OS === 'ios' ? verticalScale(40) : StatusBar.currentHeight || verticalScale(0),
    
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
  nextButton: {
    position: 'absolute',
    top: verticalScale(20),
    right: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
    zIndex: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    top: verticalScale(20),
    left: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
    zIndex: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default InstructionScreen;