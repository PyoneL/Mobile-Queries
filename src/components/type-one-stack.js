import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuOne from "../page/page-one/menu";
import QueryOneOne from "../page/page-one/query-one";
import QueryOneTwo from "../page/page-one/query-two";
import QueryOneThree from "../page/page-one/query-three";

const TypeOne = createStackNavigator();

const TypeOneStack = () => {
  return (
    <TypeOne.Navigator initialRouteName="MenuOne">
      <TypeOne.Screen
        options={{ headerShown: false }}
        name="MenuOne"
        component={MenuOne}
      />
      <TypeOne.Screen
        options={{
          headerShown: true,
          title: "Madde 1",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryOneOne"
        component={QueryOneOne}
      />
      <TypeOne.Screen
        options={{
          headerShown: true,
          title: "Madde 2",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryOneTwo"
        component={QueryOneTwo}
      />
      <TypeOne.Screen
        options={{
          headerShown: true,
          title: "Madde 3",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryOneThree"
        component={QueryOneThree}
      />
    </TypeOne.Navigator>
  );
};
export default TypeOneStack;
