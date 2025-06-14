import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { FormDataProvider } from "../context/FormDataContext";

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3392CC" />
    </View>
  );
}

export default function RootLayout() {

  return (
    <FormDataProvider>
      <Stack
        initialRouteName= "(tabs)"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="[...segment]" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="assembly-area"
          options={{
            headerShown: true,
            title: "Assembly Area",
          }}
        /> */}
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
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
