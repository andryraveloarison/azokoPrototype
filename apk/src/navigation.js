import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "./screens/CameraScreen";
import ResultScreen from "./screens/ResultScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraScreen">
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: "Azoko" }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: "📝 Résultat" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
