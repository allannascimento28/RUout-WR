import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomImage from "../assets/images/loginBottomImage.png";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { authState, updateAuthState } = useAuth();

  const isLargeScreen = width > 768;
  const isExtraLargeScreen = width > 1200;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    console.log("Login button pressed");

    setLoading(true);
    const isUserNameEmpty = userName.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    setUserNameError(isUserNameEmpty);
    setPasswordError(isPasswordEmpty);

    if (!isUserNameEmpty && !isPasswordEmpty) {
      try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
          username: userName,
          password: password,
        });
        console.log("Login response:", response.data);
        const token = response.data.token;
        const incidentTypes = response.data.incidentTypes;
        const incidentTypesId = incidentTypes.map((item: any) => ({
          id: item._id,
          title: item.incidentTypeSourceId,
        }));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

        updateAuthState({
          authToken: token,
          incidentTypes: incidentTypesId,
        });
        setLoading(false);
        // navigation.navigate("Tabs");
        router.push("/(tabs)");
        
      } catch (error: any) {
        const msg = error.response?.data?.msg || "Login failed. Try again.";
        setAuthError(msg);
        setLoading(false);
        Alert.alert("Login Failed", msg);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/LOGO.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Sign In</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
                if (text.trim() !== "") setUserNameError(false);
              }}
              placeholder="User Name"
              style={[styles.input, userNameError && styles.inputError]}
              autoCapitalize="none"
              autoCorrect={false}
              tabIndex={0}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text.trim() !== "") setPasswordError(false);
              }}
              placeholder="Password"
              style={[styles.input, passwordError && styles.inputError]}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              tabIndex={0}
            />

            {authError ? (
              <Text style={styles.errorText}>{authError}</Text>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          <Image source={BottomImage} style={styles.bottomImage} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  formContainer: { width: "100%", maxWidth: 400, alignSelf: "center" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 13, marginBottom: 10 },
  button: {
    backgroundColor: "#2986FF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  bottomImage: {
    marginTop: 30,
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
});

export default Login;
