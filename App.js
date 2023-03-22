import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConnexionScreen from "./src/screens/Connexion";
import NewQuiz from './src/screens/NewQuiz';
import AddQuestions from "./src/screens/AddQuestions";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Connexion"
          component={ConnexionScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="NewQuiz"
          component={NewQuiz}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddQuestions"
          component={AddQuestions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
