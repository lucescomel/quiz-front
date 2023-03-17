import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConnexionScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://quiz-luc.projets.lecoledunumerique.fr/api/login_check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username : email, password, }),
        }
      );

      const json = await response.json();
      // console.log("test : ", json);


    } catch (error) {
      console.error(error);
      Alert.alert("Erreur lors de la connexion");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connecte toi mon reuf</Text>
      <Text>Sinon tu pourras pas faire le quiz </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor={"black"}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={"black"}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text>Se connecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0AF7E",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F79B7E",
    borderRadius: 40,
    borderColor: "#B5715C",
    paddingVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#FA9C7F",
    borderWidth: 1,
    borderColor: "#B5715C",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },

  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
    opacity: 0.5,
    paddingVertical: 10,
  },
});
