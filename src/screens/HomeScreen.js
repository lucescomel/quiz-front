import * as React from "react";
import { StyleSheet, Button, View, Text, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connectToken } from "../utils/connectToken";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { UserConnected } from "../components/UserConnected";
import NewQuiz from '../screens/NewQuiz';

export default function HomeScreen({ navigation }) {
  // console.log("config", config);
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
        // console.log("coucou", userConnected);
        setUser(userConnected);
        // console.log("tata", userConnected);
      });

      const response = fetch(
        "https://quiz-luc.projets.lecoledunumerique.fr/apip/historics_users",
        config
      )
        .then(async function (response) {
          // console.log("tutuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
          const res = await response.json();
          setResultat(res);

          if (res && res.length > 0) {
            let score = res.reduce((a, b) => a + b.note, 0);

            setNoteGlobale((score / res.length).toFixed(2));
          }
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);

  const handleNewQuiz = () => {
    navigation.navigate("NewQuiz")
  }
  // console.log("test", resultat);
  // console.log("toto", user);
  // const noteGlobal = resultat.map((item)=> {key={{item.id}}})

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "flex-start", paddingVertical: 80 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          <Text>Bonjour </Text>
          <Text style={{ textTransform: "capitalize" }}>{user.name}</Text>
        </Text>
          <Pressable style={styles.button} onPress={handleNewQuiz}>
            <Text>Créer un nouveau quiz</Text>
          </Pressable>
      </View>
      <View style={{flex: 1}}>
        <Text>Note Globale : </Text>
        <Text>{noteGlobal || "Pas d'historique"}</Text>
      </View>
      <View
        style={{
          flex: 4,
          borderColor: "red",
          borderWidth: 2,
          paddingHorizontal: 60,
        }}
      >
        <Text>Votre Historique :</Text>
        {resultat &&
          resultat.map((item) => {
            return (
              <UserConnected
                key={item.id}
                note={item.note}
                id={item.id}
                date={item.history_date}
              />
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
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1E1736",
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#1E1736",
    fontSize: 16,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
    opacity: 0.5,
    paddingVertical: 10,
  },
});
