// import AppNavigator from './navigation';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { AuthProvider } from './context/AuthContext';

// export default function App() {
//   return (
//     <AuthProvider>
//     <SafeAreaProvider>
//       <StatusBar style="light" />
//       <AppNavigator />
//     </SafeAreaProvider>
//     </AuthProvider>
//   );
// }
import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// Create a wrapper component to handle auth routing
function AuthWrapper() {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    
    router.replace('/Login');
    // if (!authState.authToken && !inAuthGroup) {
    //   // Redirect to login if not authenticated
    //   router.replace("/Login");
    // } else if (authState.authToken && inAuthGroup) {
    //   // Redirect to tabs if authenticated
    //   // router.replace("/(tabs)");
    //    router.replace("/Login");
    // }

  }, [authState.authToken, segments]);

  return <Slot />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <AuthWrapper />
      </AuthProvider>
    </SafeAreaProvider>
  );
}