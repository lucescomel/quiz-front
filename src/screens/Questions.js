import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon, CheckBox } from "react-native-elements";
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
          console.log("res cat", res);
 
          res.map((item) => {
            const reponse = item.answers;
            console.log("item.answers: ", reponse);
            reponse.map((newItem) => {
              console.log(newItem);
            });            
          });
       
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
    <ScrollView>
      <SafeAreaView style={styles.safeArea}>
        <Button
          onPress={handleHome}/>
        <View style={styles.container}>
          <Text style={styles.title}>Question</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>Titre de la question</Text>
            {resultat &&
              resultat.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Text style={styles.questionTitle}>
                      {index + 1}. {item.title}
                    </Text>
                    {item.answers && item.answers.map((newItem) => {
                      return (
                        <Pressable>
                          <CheckBox
                            title={item.answer}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor="#E0AF7E"
                            checked={false}
                            onPress={() => console.log("checked")}
                            containerStyle={styles.answerContainer}
                          />
                          <Text style={styles.answers}>{newItem.title}</Text>
                        </Pressable>
                      )
                    })}
                  </View>
                );
              })}
 
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  // answerContainer: {
  //   backgroundColor: "transparent",
  //   borderWidth: 0,
  //   padding: 0,
  //   marginVertical: 10,
  // },
});