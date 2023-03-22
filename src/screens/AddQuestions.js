import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function AddQuestions({ navigation }) {

    const [questionName, setQuestionName] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");


  const handleHome = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.view}>
      <Button onPress={handleHome} title="Retour" />
      <View style={styles.container}>
        <Text style={styles.title}>Ajoute ta question</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nom du quiz"
            onChangeText={setQuestionName}
            value={questionName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description du quiz"
            onChangeText={setQuestionDescription}
            value={questionDescription}
          />
          <Button
            style={styles.button}
            title="Créer"
            // onPress={handleCreateQuestion}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#E0AF7E",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0AF7E",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:"#FFFFFF",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
