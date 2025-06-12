import { Stack } from "expo-router";
import Header from "../components/Header";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ActivityIndicator, View, StyleSheet } from "react-native";

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3392CC" />
    </View>
  );
}

export default function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="assembly-area"
          options={{
            headerShown: true,
            title: "Assembly Area",
          }}
        />
        <Stack.Screen
          name="Instructions"
          options={{
            headerShown: true,
            title: "Instructions",
          }}
        />
        <Stack.Screen
          name="Refusals"
          options={{
            headerShown: true,
            title: "Refusals",
          }}
        />
        <Stack.Screen
          name="PersonWithDisability"
          options={{
            headerShown: true,
            title: "Person With Disability",
          }}
        />
        <Stack.Screen
          name="SignOfDanger"
          options={{
            headerShown: true,
            title: "Sign of Danger",
          }}
        />
        <Stack.Screen
          name="AdditionalDetails"
          options={{
            headerShown: true,
            title: "Additional Details and Requests",
          }}
        />
        <Stack.Screen
          name="MediaFiles"
          options={{
            headerShown: true,
            title: "Media Files",
          }}
        />
        <Stack.Screen
          name="InstructionLink"
          options={{
            headerShown: true,
            title: "Instruction Link",
          }}
        />
        <Stack.Screen
          name="ResponseHandout"
          options={{
            headerShown: true,
            title: "Response Handout",
          }}
        />
        <Stack.Screen
          name="ResponseVideos"
          options={{
            headerShown: true,
            title: "Response Videos",
          }}
        />
        <Stack.Screen
          name="PreIncidentLinks"
          options={{
            headerShown: true,
            title: "Pre Incident Links",
          }}
        />
        <Stack.Screen
          name="SafeAtWork"
          options={{
            headerShown: false,
            title: "Safe At Work",
          }}
        />
        <Stack.Screen
          name="EvacuateNow"
          options={{
            headerShown: false,
            title: "Evacuate Now",
          }}
        />
        <Stack.Screen
          name="ShelterInPlace"
          options={{
            headerShown: false,
            title: "Shelter In Place",
          }}
        />
        <Stack.Screen
          name="PreparetoLeave"
          options={{
            headerShown: false,
            title: "Prepare to Leave",
          }}
        />
        <Stack.Screen
          name="ManualInstruction"
          options={{
            headerShown: false,
            title: "Manual Instruction",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
