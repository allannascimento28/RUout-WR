import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import { RootStackParamList, TabParamList } from "./types";
type IconName = keyof typeof Ionicons.glyphMap;

import Home from "../screens/Home";
import PreIncidentLinks from "../screens/PreIncidentLinks";
import IndicateTypes from "../screens/IndicateTypes";
import Instructions from "../screens/Instructions";
import Refusals from "../screens/Refusals";
import PersonWithDesability from "../screens/PersonWithDisability";
import AdditionalDetails from "../screens/AdditionalDetails";
import SignOfDanger from "../screens/SignOfDanger";
import MediaFiles from "../screens/MediaFiles";
import InstructionLink from "../screens/InstructionLink";
import ResponseHandout from "../screens/ResponseHandout";
import ResponseVideos from "../screens/ResponseVideos";
import SafeAtWork from '../screens/SafeAtWork';
import WatchScreen from "../screens/WatchScreen";
import EvacuateNow from "../screens/EvacuateNow";
import ShelterInPlace from "../screens/ShelterInPlace";
import ManualInstruction from "../screens/ManualInstruction";
import PreparetoLeave from "../screens/PreparetoLeave";
import AssemblyArea from "../screens/AssemblyArea";
import PersonWithDisability from "../screens/PersonWithDisability";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Links") {
            iconName = focused ? "link" : "link-outline";
          } else if (route.name === "Types") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "More") {
            iconName = focused ? "menu" : "menu-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Assembly Area" 
        component={IndicateTypes} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="stacked-line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Links" 
        component={PreIncidentLinks} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto name="link" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Watch" 
        component={WatchScreen} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="volume-up" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Instructions"
        component={Instructions}
        options={{
          headerShown: true,
          title: "Instructions",
        }}
      />

      <Stack.Screen
        name="Refusals"
        component={Refusals}
        options={{
          headerShown: true,
          title: "Refusals",
        }}
      />

      <Stack.Screen
        name="PersonWithDisability"
        component={PersonWithDisability}
        options={{
          headerShown: true,
          title: "Person With Disability",
        }}
      />

      <Stack.Screen
        name="SignOfDanger"
        component={SignOfDanger}
        options={{
          headerShown: true,
          title: "Sign of Danger",
        }}
      />

      <Stack.Screen
        name="AdditionalDetails"
        component={AdditionalDetails}
        options={{
          headerShown: true,
          title: "Additional Details and Requests",
        }}
      />

      <Stack.Screen
        name="MediaFiles"
        component={MediaFiles}
        options={{
          headerShown: true,
          title: "Media Files",
        }}
      />

      <Stack.Screen
        name="InstructionLink"
        component={InstructionLink}
        options={{
          headerShown: true,
          title: "Instruction Link",
        }}
      />
      <Stack.Screen
        name="ResponseHandout"
        component={ResponseHandout}
        options={{
          headerShown: true,
          title: "Response Handout",
        }}
      />
      <Stack.Screen
        name="ResponseVideos"
        component={ResponseVideos}
        options={{
          headerShown: true,
          title: "Response Videos",
        }}
      />

      <Stack.Screen
        name="PreIncidentLinks"
        component={PreIncidentLinks}
        options={{
          headerShown: true,
          title: "Pre Incident Links",
        }}
      />
      <Stack.Screen
        name="SafeAtWork"
        component={SafeAtWork}
        options={{
          headerShown: true,
          title: "Safe At Work",
        }}
      />

      <Stack.Screen
        name="EvacuateNow"
        component={EvacuateNow}
        options={{
          headerShown: true,
          title: "Evacuate Now",
        }}
      />

      <Stack.Screen
        name="ShelterInPlace"
        component={ShelterInPlace}
        options={{
          headerShown: true,
          title: "Shelter In Place",
        }}
      />

      <Stack.Screen
        name="PreparetoLeave"
        component={PreparetoLeave}
        options={{
          headerShown: true,
          title: "Prepare to Leave",
        }}
      />

      <Stack.Screen
        name="ManualInstruction"
        component={ManualInstruction}
        options={{
          headerShown: true,
          title: "Manual Instruction",
        }}
      />

    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
