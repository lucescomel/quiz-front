import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Pressable
} from "react-native";

export default function AddQuestions({ navigation }) {
  const [questionName, setQuestionName] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");


  const handleCreateQuestion = () => {

  };


  const handleHome = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.view}>
      <Button onPress={handleHome} title="< Retour" />
      <View style={styles.container}>
        <Text style={styles.title}>Ajoute ta question</Text>
        <View style={styles.form}>
          <Text style={styles.Text}>La question :</Text>
          <TextInput
            style={styles.input}
            placeholder="Écris ta question"
            onChangeText={setQuestionName}
            value={questionName}
          />
          <View>
            <Text style={styles.Text}>Réponse 1 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Réponse 1"
              onChangeText={setQuestionDescription}
              value={questionDescription}
            />
            <Text style={styles.Text}>Réponse 2 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Réponse 2"
              onChangeText={setQuestionDescription}
              value={questionDescription}
            />
            <Text style={styles.Text}>Réponse 3 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Réponse 3"
              onChangeText={setQuestionDescription}
              value={questionDescription}
            />
            <Text style={styles.Text}>Réponse 4 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Réponse 4"
              onChangeText={setQuestionDescription}
              value={questionDescription}
            />
          </View>
          {/* <Button
            style={styles.button}
            title="Créer"
            // onPress={handleCreateQuestion}
          /> */}
        </View>
        <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Ajouter une nouvelle question</Text>
      </Pressable>
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
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  Text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center",
    paddingTop: 15,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#E0AF7E",
    fontWeight: "bold",
  },
});
