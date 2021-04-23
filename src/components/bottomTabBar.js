import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TypeOneStack from "./type-one-stack";
import TypeTwoStack from "./type-two-stack";
import TypeThreeStack from "./type-three-stack";

const Tabs = createMaterialBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tabs.Navigator
      activeColor="#ede1e1"
      inactiveColor="#e37d7d"
      barStyle={{ backgroundColor: "#c93030" }}
    >
      <Tabs.Screen
        name="Tip 1"
        component={TypeOneStack}
        options={{
          tabBarLabel: "Tip 1",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="android-auto"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tip 2"
        component={TypeTwoStack}
        options={{
          tabBarLabel: "Tip 2",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="android-auto"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tip 3"
        component={TypeThreeStack}
        options={{
          tabBarLabel: "Tip 3",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="android-auto"
              color={color}
              size={22}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabBar;
