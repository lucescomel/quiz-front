import * as React from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connectToken } from "../utils/connectToken";
import { useState, useEffect } from "react";

export default function HomeScreen({ navigation }) {
  // console.log("config", config);
  const [Resultat, setResultat] = useState("");

  useEffect(() => {
    (async () => {
      const config = await connectToken();

      const response = fetch(
        "https://brief12-api-quiz.projets.lecoledunumerique.fr/apip/historics",
        config
      )
        .then(async function (response) {
          // console.log("rep :", await response.json());
          const res = await response.json();
          setResultat(res);
        })
        .catch(function (error) {
          console.log("t nul");
        });
    })();
  }, []);

  // useEffect(() => {
  //   // console.log("toto");

  //   getHistorics;
  //   const getHistorics = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://quiz-luc.projets.lecoledunumerique.fr/apip/historics",
  //         {
  //           config,
  //         }
  //         );
  //         console.log("rep", response);
  //         const data = await response.json();
  //         console.log("data", data);

  //         if (response.status === 200) {
  //           // console.log("test : ", data);
  //         } else {
  //           Alert.alert("Erreur lors de la récupération de l'historique");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         Alert.alert("Erreur lors de la récupération de l'historique");
  //       }
  //     };
  //     getHistorics();
  //   }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to connexion"
        onPress={() => navigation.navigate("Connexion")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
