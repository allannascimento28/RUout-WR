import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { useRouter } from 'expo-router';

const Home = () => {
  // const navigation = useNavigation<RootStackNavigation>();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activating, setActivating] = useState(false);
  const [navigatingToPreIncident, setNavigatingToPreIncident] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadResources() {
      // await loadFonts();
      setFontsLoaded(true);
    }
    loadResources();
  }, []);

  const handleActivate = () => {
    setActivating(true);
    setTimeout(() => {
      // navigation.navigate('AssemblyArea');
      router.push('/assembly-area');
      setActivating(false);
    }, 300);
  };

  const handlePreIncidentLinks = () => {
    setNavigatingToPreIncident(true);
    setTimeout(() => {
      // navigation.navigate('PreIncidentLinks');
      router.push('/pre-incident-links');
      setNavigatingToPreIncident(false);
    }, 300);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3392CC" />
        <Text style={styles.loadingText}>Loading resources...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Incident{'\n'}Activation
        </Text>
        <View style={styles.separator} />


        <Text style={styles.termsLabel}>Terms</Text>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            I agree that deliberately activating an incident and providing false information is malicious in nature, and penalties may apply.
          </Text>
          <Text style={styles.termsText}>
            I agree that by activating an incident, my location and date will be collected and shared by R U OUT.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.activateButton}
        onPress={handleActivate}
        disabled={activating}
      >
        {activating ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.activateButtonText}>ACTIVATE</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.preIncidentButton}
        onPress={handlePreIncidentLinks}
        disabled={navigatingToPreIncident}
      >
        {navigatingToPreIncident ? (
          <ActivityIndicator size="small" color="#3392CC" />
        ) : (
          <Text style={styles.preIncidentText}>PRE INCIDENT LINKS</Text>
        )}
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    // marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#3392CC',
    fontWeight: '500',
  },
  title: {
    color: '#3392CC',
    fontSize: 31,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Manrope-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#CACACA',
    marginBottom: 24,
  },
  termsLabel: {
    fontSize: 18,
    color: '#363636',
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Manrope-SemiBold',
  },
  termsContainer: {
    gap: 8,
  },
  termsText: {
    color: '#363636',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Manrope-Medium',
  },
  buttonContainer: {
    marginBottom: 20,
    gap: 12,
  },
  preIncidentButton: {
    backgroundColor: '#DFF0FF',
    borderColor: '#3392CC',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, 
  },
  preIncidentText: {
    color: '#3392CC',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activateButton:{
    backgroundColor: '#F9980D',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center', 
    justifyContent: 'center',
    height: 54,
  },
  activateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
  },
});
