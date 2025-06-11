import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/Header";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AssemblyArea"
        options={{
          title: "AssemblyArea",
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
        name="InstructionLink"
        options={{
          title: "Links",
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto name="link" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="WatchScreen"
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