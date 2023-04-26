import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";
import { connectToken } from "../utils/connectToken";
import { getMoyenne } from "../utils/default";
 

export default function HomeScreen({ navigation }) {
  const [resultat, setResultat] = useState([]);
  const [user, setUser] = useState("");
  // const [noteGlobale, setNoteGlobale] = useState(null);
 
  useEffect(() => {
    (async () => {
      const config = await connectToken();
 
      const responseUser = fetch(
        "https://quiz-back-luc.projets.lecoledunumerique.fr/apip/user_connect",
        config
      ).then(async function (responseUser) {
        const userConnected = await responseUser.json();
        setUser(userConnected);
      });
 
      const response = fetch(
        "https://quiz-back-luc.projets.lecoledunumerique.fr/apip/historics_users",
        config
      )
        .then(async function (response) {
          const res = await response.json();
          setResultat(res);
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);
 
  const handleNewQuiz = () => {
    navigation.navigate("NewQuiz");
  };
 
  const handleAddQuestion = () => {
    navigation.navigate("AddQuestions");
  };
 
  const noteGlobale = getMoyenne(resultat);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>
          Bonjour{" "}
          <Text style={styles.userInfoName}>{user?.name || "Utilisateur"}</Text>
        </Text>
        <Pressable style={styles.button} onPress={handleNewQuiz}>
          <Text style={styles.buttonText}>Nouveau quiz</Text>
        </Pressable>
      </View>
      <View style={styles.addQuestionContainer}>
        <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
          <Text style={styles.buttonText}>Ajouter une nouvelle question</Text>
        </TouchableOpacity>
      </View>
 
      <ScrollView style={styles.scrollView}>
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Note globale :</Text>
          <Text style={styles.noteValue}>
            {noteGlobale || "Pas d'historique"}
          </Text>
        </View>
 
        <View style={styles.historiqueContainer}>
          <Text style={styles.historiqueLabel}>Votre historique :</Text>
          {resultat.map((item) => (
            <TouchableOpacity
              key={item.historic.id}
              style={styles.historiqueItem}
            >
              <View style={styles.historiqueItemLeft}>
                <Text style={styles.historiqueItemCategory}>
                  {Object.values(item.categories).length === 1
                    ? Object.values(item.categories)[0]
                    : "Générale"}
                </Text>
                <Text style={styles.historiqueItemDate}>
                  {moment(item.historic.history_date).format("DD/MM/YY - HH:mm")}
                </Text>
              </View>
              <View style={styles.historiqueItemRight}>
                <Text style={styles.historiqueItemNote}>{item.historic.note}</Text>
 
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
 
    
 
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0AF7E",
  },
  userInfo: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  userInfoName: {
    textTransform: "capitalize",
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

  addQuestionButton: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  noteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noteLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  noteValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFFFFF",
  },
  historiqueContainer: {
    flex: 4,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  historiqueLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});