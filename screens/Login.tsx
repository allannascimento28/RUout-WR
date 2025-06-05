import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, moderateScale } from "react-native-size-matters";
import BottomImage from "../assets/loginBottomImage.png";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "../navigation/types";

const Login = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const { setAuthToken, setIncidentTypes } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [ authError, setAuthError ] = useState("");
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  
  // Get dynamic screen dimensions
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isLargeScreen = width > 768;
  const isExtraLargeScreen = width > 1200;
  
  // Dynamic scaling based on screen size
  const getScaledSize = (size: number) => {
    if (isExtraLargeScreen) {
      // Cap the scaling for extra large screens
      return moderateScale(size, 0.3);
    }
    if (isLargeScreen) {
      return moderateScale(size, 0.5);
    }
    return scale(size);
  };

  const handleLoginAPI = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        username: userName,
        password: password
      });

      if (response.status !== 200) {
        Alert.alert(
          "Login Failed",
          response.msg
        )
        setIsAuthenticated(false);
        setAuthError(response.msg);
        return;
      }
      
      const token = response.data.token;
      setIsAuthenticated(true);
      setAuthError("");
      console.log("Login Response:", response.data);
      console.log("token", token);
      const incidentTypes = response.data.incidentTypes;
      const incidentTypesId = incidentTypes.map((item: any) => {
        const id = item._id;
        const title = item.incidentTypeSourceId;

        const obj = {
          id: id,
          title: title
        }
        return obj;
      })
      await setIncidentTypes(incidentTypesId);
      console.log("incidentTypesId", incidentTypesId);

      await setAuthToken(token);
      navigation.navigate("Tabs");
    } catch (error: any) {
      console.log("Login failed:",  error.response?.data.msg);
      setAuthError(error.response?.data.msg || "An error occurred during login. Please try again.");
      Alert.alert(
        "Login Failed",
        error.response?.data?.msg || "An error occurred during login. Please try again.",
        [{ text: "OK" }]
      );
    }
  };
  
  const handleLogin = () => {
    const isUserNameEmpty = userName.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    setUserNameError(isUserNameEmpty);
    setPasswordError(isPasswordEmpty);

    if (!isUserNameEmpty && !isPasswordEmpty) {
      handleLoginAPI();
    }
  };

  const handleUserNameChange = (text: string) => {
    setUserName(text);
    if (text.trim() !== "") setUserNameError(false);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.trim() !== "") setPasswordError(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.innerContainer}
      >
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer,
            isLargeScreen && styles.largeScrollContainer,
            isExtraLargeScreen && styles.extraLargeScrollContainer
          ]}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[
              styles.content,
              isLargeScreen && styles.largeScreenContent,
              isExtraLargeScreen && styles.extraLargeScreenContent
            ]}>
              <Image 
                source={require("../assets/LOGO.png")} 
                style={[
                  styles.logo, 
                  isLargeScreen && styles.largeLogo,
                  isExtraLargeScreen && styles.extraLargeLogo
                ]} 
              />
              <Text style={[
                styles.title,
                isLargeScreen && styles.largeTitle,
                isExtraLargeScreen && styles.extraLargeTitle
              ]}>Sign In</Text>

              <View style={[
                styles.formContainer,
                isLargeScreen && styles.largeFormContainer,
                isExtraLargeScreen && styles.extraLargeFormContainer
              ]}>
                <View style={styles.inputContainer}>
                  <Text style={[
                    styles.label,
                    isLargeScreen && styles.largeLabel,
                    isExtraLargeScreen && styles.extraLargeLabel
                  ]}>User Name</Text>
                  <TextInput
                    style={[
                      styles.input, 
                      userNameError && styles.inputError,
                      isLargeScreen && styles.largeInput,
                      isExtraLargeScreen && styles.extraLargeInput
                    ]}
                    value={userName}
                    onChangeText={handleUserNameChange}
                    placeholder="Enter your username"
                  />
                  {/* {userNameError && <Text style={styles.errorText}>Enter the username</Text>} */}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[
                    styles.label,
                    isLargeScreen && styles.largeLabel,
                    isExtraLargeScreen && styles.extraLargeLabel
                  ]}>Password</Text>
                  <TextInput
                    style={[
                      styles.input, 
                      passwordError && styles.inputError,
                      isLargeScreen && styles.largeInput,
                      isExtraLargeScreen && styles.extraLargeInput
                    ]}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                    placeholder="Enter your password"
                  />
                  {/* {passwordError && <Text style={styles.errorText}>Enter the password</Text>} */}
                </View>

                {authError ? (
                  <Text style={styles.errorText}>{authError}</Text>
                ) : null}
                
                <TouchableOpacity 
                  style={[
                    styles.button,
                    isLargeScreen && styles.largeButton,
                    isExtraLargeScreen && styles.extraLargeButton
                  ]} 
                  onPress={handleLogin}
                >
                  <Text style={[
                    styles.buttonText,
                    isLargeScreen && styles.largeButtonText,
                    isExtraLargeScreen && styles.extraLargeButtonText
                  ]}>Continue</Text>
                </TouchableOpacity>
              </View>

              {(!isLandscape || isLargeScreen) && (
                <Image 
                  source={BottomImage} 
                  style={[
                    styles.bottomImage,
                    isLargeScreen && styles.largeBottomImage,
                    isExtraLargeScreen && styles.extraLargeBottomImage
                  ]} 
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  largeScrollContainer: {
    paddingHorizontal: "10%",
  },
  extraLargeScrollContainer: {
    paddingHorizontal: "15%",
    maxWidth: 1600,
    alignSelf: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  largeScreenContent: {
    paddingHorizontal: "10%",
  },
  extraLargeScreenContent: {
    paddingHorizontal: 0, // Use a fixed width container instead of percentage
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  logo: {
    width: scale(100),
    height: scale(100),
    marginBottom: "5%",
    resizeMode: "contain",
  },
  largeLogo: {
    width: scale(120),
    height: scale(120),
  },
  extraLargeLogo: {
    width: 130, // Fixed size for extra large screens
    height: 130,
    marginBottom: 40,
  },
  title: {
    fontSize: scale(24),
    fontFamily: "Manrope-ExtraBold",
    fontWeight: "bold",
    marginBottom: "7%",
  },
  largeTitle: {
    fontSize: scale(28),
  },
  extraLargeTitle: {
    fontSize: 32, // Fixed size for extra large screens
    marginBottom: 30,
  },
  formContainer: {
    width: "100%",
    maxWidth: 450,
  },
  largeFormContainer: {
    maxWidth: 500,
  },
  extraLargeFormContainer: {
    maxWidth: 550,
  },
  inputContainer: {
    width: "100%",
    marginBottom: "4%",
  },
  label: {
    marginBottom: "2%",
    fontSize: scale(16),
    fontFamily: "Manrope-Bold",
  },
  largeLabel: {
    fontSize: scale(18),
  },
  extraLargeLabel: {
    fontSize: 20, // Fixed size
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E4E7EC",
    borderRadius: scale(10),
    padding: scale(12),
    width: "100%",
    fontSize: scale(14),
  },
  largeInput: {
    padding: scale(14),
    fontSize: scale(16),
    borderRadius: scale(12),
  },
  extraLargeInput: {
    padding: 16, // Fixed size
    fontSize: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: "1%",
    fontSize: scale(12),
    fontFamily: "Manrope-Regular",
  },
  button: {
    backgroundColor: "#2986FF",
    width: "100%",
    borderRadius: scale(10),
    paddingVertical: scale(14),
    paddingHorizontal: scale(32),
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  largeButton: {
    paddingVertical: scale(16),
    borderRadius: scale(12),
  },
  extraLargeButton: {
    paddingVertical: 18, // Fixed size
    borderRadius: 14,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Manrope-ExtraBold",
    fontSize: scale(16),
  },
  largeButtonText: {
    fontSize: scale(18),
  },
  extraLargeButtonText: {
    fontSize: 18, // Fixed size
  },
  bottomImage: {
    marginTop: "8%",
    width: "90%",
    height: undefined,
    aspectRatio: 2,
    alignSelf: "center",
    maxWidth: 500,
  },
  largeBottomImage: {
    width: "70%",
    maxWidth: 700,
  },
  extraLargeBottomImage: {
    width: "60%",
    maxWidth: 800,
    marginTop: 40,
  },
});

export default Login;