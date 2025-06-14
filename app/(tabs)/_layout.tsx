import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Header from '@/components/Header';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="assembly-area"
        options={{
          title: "Assembly Area",
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons
              name="stacked-line-chart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="instruction-link"
        options={{
          title: "Links",
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto name="link" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="watch-screen"
        options={{
          title: "Watch",
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="volume-up" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
