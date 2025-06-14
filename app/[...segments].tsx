import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useSegments, useRouter } from 'expo-router';
import { getDeeplinkParams, setDeeplinkParams } from '../utils/deepLinkParams';

export default function DeepLinkHandler() {
  const router = useRouter();
  const segments = useSegments();
  const params = useLocalSearchParams();
    const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      const paramValues = segments.filter(segment => segment.length > 0);
      const processedParams = Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])
      );
      console.log('Deep link parameters:', { segments: paramValues, queryParams: processedParams });

      setDeeplinkParams(processedParams);
      
      console.log('Auth state after setting deep link params:', await getDeeplinkParams());
      
      setIsReady(true);
    };
    init();
  }, []);
  
  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        router.replace('/');
      }, 300);
    }
  }, [isReady]);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3392CC" />
      <Text style={{ marginTop: 20 }}>Processing...</Text>
    </View>
  );
}