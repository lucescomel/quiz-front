import React, { useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connectToken } from "../utils/connectToken";

export default function QuestionScreen({ navigation, route }) {
  const [resultat, setResultat] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      const config = await connectToken();

      const categoryId = route.params.idCat;
      // console.log("Page QUESTION CATEGORIE : ", categoryId);
      const response = fetch(
        `https://quiz-luc.projets.lecoledunumerique.fr/apip/cat_questions/${categoryId}`,
        config
      )
        .then(async function (response) {
          const res = await response.json();
          // console.log('resultat', res);
          setResultat(res);
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button onPress={handleHome} title="< Retour" />
      <View style={styles.container}>
        <Text style={styles.title}>Question</Text>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>Titre de la question</Text>
          <Pressable style={styles.answerContainer}>
            {resultat &&
              resultat.map((item) => {
                return (
                  <View key={item.id}>
                    <Text>{item.title}</Text>
                  </View>
                );
              })}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E0AF7E",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 20,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
