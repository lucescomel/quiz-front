import { StyleSheet, Button, View, Text, Image, Pressable } from "react-native";
import { connectToken } from "../utils/connectToken";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { UserConnected } from "../components/UserConnected";
import moment from "moment";
import { getMoyenne } from "../utils/default";

export default function HomeScreen({ navigation }) {
  const [resultat, setResultat] = useState([]);
  const [user, setUser] = useState("");
  // const [noteGlobale, setNoteGlobale] = useState(null);

  useEffect(() => {
    (async () => {
      const config = await connectToken();

      const responseUser = fetch(
        "https://quiz-luc.projets.lecoledunumerique.fr/apip/user_connect",
        config
      ).then(async function (responseUser) {
        const userConnected = await responseUser.json();
        setUser(userConnected);
      });

      const response = fetch(
        "https://quiz-luc.projets.lecoledunumerique.fr/apip/historics_users",
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
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>
          Bonjour <Text style={styles.userInfoName}>{user.name}</Text>
        </Text>
        <Pressable style={styles.button} onPress={handleNewQuiz}>
          <Text style={styles.buttonText}>Créer un nouveau quiz</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleAddQuestion}>
        <Text style={styles.buttonText}>Ajouter une nouvelle question</Text>
      </Pressable>

      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Note globale :</Text>
        <Text style={styles.noteValue}>
          {noteGlobale || "Pas d'historique"}
        </Text>
      </View>

      <View style={styles.historiqueContainer}>
        <Text style={styles.historiqueLabel}>Votre historique :</Text>
        {resultat &&
          resultat.map((item) => {
            return (
              <View 
                key={item.historic.id}>
                <Text>
                  Catégorie :{" "}
                  {Object.values(item.categories).length == 1
                    ? Object.values(item.categories)[0]
                    : "Générale"}
                </Text>
                <UserConnected
                 
                  note={item.historic.note}
                  date={moment(item.historic.history_date).format(
                    "DD/MM/YY - HH:mm"
                  )}
                />
              </View>
            );
          })}
      </View>

      <StatusBar style="auto" />
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
  userInfo: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 80,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: "bold",
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
  noteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noteLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noteValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
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
