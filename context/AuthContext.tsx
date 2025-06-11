import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  isLoading: boolean;
};

const initialAuthState: AuthState = {
  authToken: null,
  incidentTypes: [],
};

const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  updateAuthState: () => {},
  setAuthState: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load auth state from AsyncStorage on app start
  useEffect(() => {
    console.log("Context loading...");
    const loadAuthState = async () => {
      try {
        const [authToken, incidentTypes] = await Promise.all([
          AsyncStorage.getItem("authToken"),
          AsyncStorage.getItem("incidentTypes"),
        ]);
        
        console.log("Loaded from AsyncStorage:", { authToken, incidentTypes });
        
        if (authToken || incidentTypes) {
          const newState: AuthState = {
            authToken: authToken || null,
            incidentTypes: incidentTypes ? JSON.parse(incidentTypes) : [],
          };
          console.log("Setting loaded auth state:", newState);
          setAuthState(newState);
        }
      } catch (error) {
        console.error("Failed to load auth state from storage", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };
    
    loadAuthState();
  }, []);

  // Persist auth state to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    
    console.log("Persisting auth state:", authState);
    const persistAuthState = async () => {
      try {
        if (authState.authToken) {
          await AsyncStorage.setItem("authToken", authState.authToken);
        } else {
          await AsyncStorage.removeItem("authToken");
        }
        
        if (authState.incidentTypes && authState.incidentTypes.length > 0) {
          await AsyncStorage.setItem(
            "incidentTypes",
            JSON.stringify(authState.incidentTypes)
          );
        } else {
          await AsyncStorage.removeItem("incidentTypes");
        }
        console.log("Auth state persisted successfully");
      } catch (error) {
        console.error("Failed to persist auth state", error);
      }
    };
    
    persistAuthState();
  }, [authState, isInitialized]);

  const updateAuthState = useCallback((updates: Partial<AuthState>) => {
    console.log("Updating auth state with:", updates);
    setAuthState((prev) => {
      const newState = { ...prev, ...updates };
      console.log("New auth state:", newState);
      return newState;
    });
  }, []);

  const contextValue: AuthContextType = {
    authState,
    updateAuthState,
    setAuthState,
    isLoading,
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
      await AsyncStorage.multiRemove(['authToken', 'incidentTypes']);
      
      setAuthState(initialAuthState);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [setAuthState]);
};