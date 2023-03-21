import { StyleSheet, Button, View, Text, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connectToken } from "../utils/connectToken";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { UserConnected } from "../components/UserConnected";
import NewQuiz from "../screens/NewQuiz";

export default function HomeScreen({ navigation }) {
  const [resultat, setResultat] = useState([]);
  const [user, setUser] = useState("");
  const [noteGlobal, setNoteGlobale] = useState(null);

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

          // if (res && res.length > 0) {
          //   let score = res.reduce((a, b) => a + b.note, 0);
          //   setNoteGlobale((score / res.length).toFixed(2));
          // }
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);

  const handleNewQuiz = () => {
    navigation.navigate("NewQuiz");
  };

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

      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Note globale :</Text>
        {/* <Text style={styles.noteValue}>{noteGlobal || "Pas d'historique"}</Text> */}
      </View>

      <View style={styles.historiqueContainer}>
        <Text style={styles.historiqueLabel}>Votre historique :</Text>
        {resultat &&
          resultat.map((item) => (
            <UserConnected
              key={item.id}
              // note={item.note}
              // id={item.id}
              date={item.historic.history_date}
              category={item.categories[2]}
            />
          ))}
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
    flex: 3,
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
