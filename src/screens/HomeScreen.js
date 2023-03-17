import * as React from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import connectToken from "../utils/connectToken";

export default function HomeScreen({ navigation }) {
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token_key");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to connexion"
        onPress={() => navigation.navigate("Connexion")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1E1736",
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#1E1736",
    fontSize: 16,
  },
});
