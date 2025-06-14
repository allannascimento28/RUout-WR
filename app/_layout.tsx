import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import { FormDataProvider } from "../context/FormDataContext";

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3392CC" />
    </View>
  );
}

export default function RootLayout() {
  // const { isLoading } = useAuth();

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <AuthProvider>
      <FormDataProvider>
      <Stack
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="assembly-area"
          options={{
            headerShown: true,
            title: "Assembly Area",
          }}
        />
        
          <Stack.Screen
            name="instructions"
            options={{
              headerShown: true,
              title: "Instructions",
            }}
          />
          <Stack.Screen
            name="refusals"
            options={{
              headerShown: true,
              title: "Refusals",
            }}
          />
          <Stack.Screen
            name="person-with-disability"
            options={{
              headerShown: true,
              title: "Person With Disability",
            }}
          />
          <Stack.Screen
            name="sign-of-danger"
            options={{
              headerShown: true,
              title: "Sign of Danger",
            }}
          />
          <Stack.Screen
            name="additional-details"
            options={{
              headerShown: true,
              title: "Additional Details and Requests",
            }}
          />
          <Stack.Screen
            name="media-files"
            options={{
              headerShown: true,
              title: "Media Files",
            }}
          />
          <Stack.Screen
            name="instruction-link"
            options={{
              headerShown: true,
              title: "Instruction Link",
            }}
          />
          <Stack.Screen
            name="response-handout"
            options={{
              headerShown: true,
              title: "Response Handout",
            }}
          />
          <Stack.Screen
            name="response-videos"
            options={{
              headerShown: true,
              title: "Response Videos",
            }}
          />
          <Stack.Screen
            name="pre-incident-links"
            options={{
              headerShown: true,
              title: "Pre Incident Links",
            }}
          />
          <Stack.Screen
            name="safe-at-work"
            options={{
              headerShown: false,
              title: "Safe At Work",
            }}
          />
          <Stack.Screen
            name="evacuate-now"
            options={{
              headerShown: false,
              title: "Evacuate Now",
            }}
          />
          <Stack.Screen
            name="shelter-in-place"
            options={{
              headerShown: false,
              title: "Shelter In Place",
            }}
          />
          <Stack.Screen
            name="prepare-to-leave"
            options={{
              headerShown: false,
              title: "Prepare to Leave",
            }}
          />
          <Stack.Screen
            name="manual-instruction"
            options={{
              headerShown: false,
              title: "Manual Instruction",
            }}
          />
      </Stack>
        </FormDataProvider>
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
