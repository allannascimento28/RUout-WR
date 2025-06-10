import React, { createContext, useContext, useState, useEffect, use, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of the context

type IncidentType = {
  id: string;
  title: string;
};

interface AuthState {
  authToken: string | null;
  incidentTypes: IncidentType[];
}

type AuthContextType = {
  authState: AuthState;
  updateAuthState: (updates: Partial<AuthState>) => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

const initialAuthState: AuthState = {
  authToken: null,
  incidentTypes: [],
};



// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  updateAuthState: () => {},
  setAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {

    const loadAuthState = async () => {
      try {
        setAuthState({
          ...initialAuthState,
          incidentTypes: [],
        });
        const [authToken, incidentTypes] = await Promise.all([
          AsyncStorage.getItem("authToken"),
          AsyncStorage.getItem("incidentTypes"),
        ]);
        if (authToken) {
          const newState: AuthState = {
            authToken,
            incidentTypes: incidentTypes ? JSON.parse(incidentTypes) : [],
          };
          setAuthState(newState);
        }
      } catch (error) {
        console.error("Failed to load auth state from storage", error);
      } finally {
        setIsInitialized(true);
      }
    };
    loadAuthState();
  }, []);

  useEffect(() => {
    const persistAuthState = async () => {
      try {
        await AsyncStorage.setItem("authToken", authState.authToken || "");
        await AsyncStorage.setItem(
          "incidentTypes",
          JSON.stringify(authState.incidentTypes)
        );
      } catch (error) {
        console.error("Failed to persist auth state", error);
      }
    };
    if (isInitialized) {
      persistAuthState();
    }
  }, [authState, isInitialized]);

  const contextValue: AuthContextType = {
    authState,
    updateAuthState: (updates: Partial<AuthState>) => {
      setAuthState((prev) => ({ ...prev, ...updates }));
    },
    setAuthState,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const useLogout = () => {
  const { setAuthState } = useAuth();

  return useCallback(async () => {
    try {
      console.log('Logging out user...');
      const keys = await AsyncStorage.getAllKeys();
      const authKeys = keys.filter(key => key.startsWith('auth_'));
      await AsyncStorage.multiRemove(authKeys);

      setAuthState(initialAuthState);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [setAuthState]);
};

