import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuThree from "../page/page-three/menu";
import QueryThreeOne from "../page/page-three/query-one";
import QueryThreeTwo from "../page/page-three/query-two";
import QueryThreeThree from "../page/page-three/query-three";

const TypeThree = createStackNavigator();

const TypeThreeStack = () => {
  return (
    <TypeThree.Navigator initialRouteName="MenuThree">
      <TypeThree.Screen
        options={{ headerShown: false, title: "Sorgular : Tip 3" }}
        name="MenuThree"
        component={MenuThree}
      />
      <TypeThree.Screen
        options={{
          headerShown: true,
          title: "Madde 1",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryThreeOne"
        component={QueryThreeOne}
      />
      <TypeThree.Screen
        options={{
          headerShown: true,
          title: "Madde 2",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryThreeTwo"
        component={QueryThreeTwo}
      />
      <TypeThree.Screen
        options={{
          headerShown: true,
          title: "Madde 3",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#e85f5f" },
        }}
        name="QueryThreeThree"
        component={QueryThreeThree}
      />
    </TypeThree.Navigator>
  );
};
export default TypeThreeStack;
