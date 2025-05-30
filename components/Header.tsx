import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

const Header = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={styles.header}>
        {/* Center Text */}
        <Text style={styles.headerText}>Save Time Save Life</Text>

        {/* Bottom-left Logo */}
        <Image source={require('../assets/LOGO.png')} style={styles.logo} />
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
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Manrope-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: scale(50),
    height: scale(50),
    position: 'absolute',
    bottom: 0,
    left: 16,
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: scale(20),
  },
});

export default Header;
