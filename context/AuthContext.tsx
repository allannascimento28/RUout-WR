import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of the context

type IncidentType = {
  id: string;
  title: string;
};

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
  incidentTypes: IncidentType[];
  setIncidentTypes: (types: IncidentType[]) => void;
};




// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {},
  incidentTypes: [],
  setIncidentTypes: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([]);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setAuthTokenState(token);
        }
      } catch (error) {
        console.error("Failed to load auth token from storage", error);
      }
    };

    loadToken();
  }, []);

  const setAuthToken = async (token: string | null) => {
    try {
      if (token) {
        await AsyncStorage.setItem("authToken", token);
        
      } else {
        await AsyncStorage.removeItem("authToken");
      }
      setAuthTokenState(token);
    } catch (error) {
      console.error("Failed to save auth token", error);
    }
  };




  const logout = async () => {
    await setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout, incidentTypes, setIncidentTypes }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
