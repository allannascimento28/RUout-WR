import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={styles.header}>
        {/* Center Text */}
        <Text style={styles.headerText}>Save Time, Save Life</Text>

        {/* Bottom-left Logo with responsive sizing */}
        <Image 
          source={require('../assets/images/LOGO.png')} 
          style={[
            styles.logo
          ]} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerText: {
    color: '#3392CC',
    fontSize: 14,
    fontFamily: 'Manrope-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -20,
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 16,
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: 20,
  }
});

export default Header;