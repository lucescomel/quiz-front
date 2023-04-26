import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { connectToken } from "../utils/connectToken";
import { useQuestionsStore } from "../lib/store/questionsStore";
import { useReponsesStore } from "../lib/store/reponsesStore";
import { useHistoriquesStore } from "../lib/store/historiquesStore";
import { StatusBar } from "expo-status-bar";

export default function QuestionScreen({ navigation, route }) {
  // const [resultat, setResultat] = useState([]);
  const [user, setUser] = useState("");
  const {
    questions,
    setQuestions,
    setCurrentQuestion,
    currentQuestion,
    increasePoints,
    point,
  } = useQuestionsStore();
  const { reponses, setReponses, currentReponse } = useReponsesStore();
  const {
    historiques,
    setHistoriques,
    setCurrentHistorique,
    currentHistorique,
  } = useHistoriquesStore();

  useEffect(() => {
    // console.log("début");
    (async () => {
      const config = await connectToken();

      const categoryId = route.params.idCat;
      // console.log("Page QUESTION CATEGORIE : ", categoryId);
      const response = fetch(
        `https://quiz-back-luc.projets.lecoledunumerique.fr/apip/cat_questions/${categoryId}`,
        config
      )
        .then(async function (response) {
          const res = await response.json();
          // console.log("toto");
          // console.log("res cat", JSON.stringify(res, null, 2));
          setQuestions(res);
          setCurrentQuestion(res[0]);

          // console.log('resultat', res);
          // setResultat(res);
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleClick = (idReponse) => {
    if (currentQuestion.id_success.id === idReponse) {
      console.log("juste");
      increasePoints();
    } else {
      console.log("faux");
    }

    // Chercher l'index de la question actuelle dans le tableau questions
    const currentIndex = questions.findIndex(
      (q) => q.id === currentQuestion.id
    );

    // Si l'index n'est pas le dernier élément du tableau
    if (currentIndex !== questions.length - 1) {
      // Mettre à jour l'état currentQuestion avec la question suivante
      setCurrentQuestion(questions[currentIndex + 1]);
    } else {
      // Si c'est la dernière question, naviguer vers la page des résultats
      navigation.navigate("Resultat");
    }
  };
  console.log("point :", point);
  // console.log("index :", currentQuestion);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Button onPress={handleHome} title="< Back" />
        <View style={styles.container}>
          <Text style={styles.title}>Question</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>
              {currentQuestion && currentQuestion.title}
            </Text>
            {currentQuestion &&
              currentQuestion.answers &&
              currentQuestion.answers.map((newItem) => {
                return (
                  <Pressable
                    key={newItem.id}
                    onPress={() => handleClick(newItem.id)}
                  >
                    {/* <CheckBox
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checkedColor="#E0AF7E"
                      checked={false}
                      containerStyle={styles.answerContainer}
                    /> */}
                    <Text style={styles.answers}>{newItem.title}</Text>
                  </Pressable>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backButton: {
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
    textAlign: "center",
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: "#E0AF7E",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answers: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 20,
    borderColor: "#E0AF7E",
    borderWidth: 1,
    borderRadius: 5,
  },
  // answerContainer: {
  //   backgroundColor: "transparent",
  //   borderWidth: 0,
  //   padding: 0,
  //   marginVertical: 10,
  // },
});
