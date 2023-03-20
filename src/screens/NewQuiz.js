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

export default function NewQuiz({ navigation }) {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleCreateQuiz = () => {
    // Code pour envoyer les données du formulaire vers l'API et créer le quiz
    console.log(`Nom : ${quizName} / Description : ${quizDescription}`);
  };

  return (
    <SafeAreaView style={styles.view}>
      <Button onPress={handleHome} title="Retour" />
      <View style={styles.container}>
        <Text style={styles.title}>Créer un quiz</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nom du quiz"
            onChangeText={setQuizName}
            value={quizName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description du quiz"
            onChangeText={setQuizDescription}
            value={quizDescription}
          />
          <Button
            style={styles.button}
            title="Créer"
            onPress={handleCreateQuiz}
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
      paddingHorizontal: 10,
      marginBottom: 20,
    },
  });
