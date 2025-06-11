import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, Platform, StatusBar } from 'react-native';
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
        onPress={() => navigation.navigate('Tabs', { screen: 'Watch' })}
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
    marginTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 0,
    
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  image: {
    width: 200,
    height: 200,
  },
  heading: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  nextButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InstructionScreen;