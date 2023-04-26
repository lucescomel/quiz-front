import { Text, View, Pressable, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { connectToken } from "../utils/connectToken";
import { CardCategories } from "../components/CardCategorie";

export default function NewQuizzScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [resultat, setResultat] = useState([]);

  const handleHome = () => {
    navigation.navigate("Home");
  };
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
        "https://quiz-back-luc.projets.lecoledunumerique.fr/apip/categories",
        config
      )
        .then(async function (response) {
          const res = await response.json();
          // console.log("resultat Categories :", res["hydra:member"]);
          setResultat(res["hydra:member"]);
        })
        .catch(function (error) {
          console.log("mauvais", error);
        });
    })();
  }, []);
  // useState ICI object.hydra:member ==> object["hydra:member"].map((itm) => itm.idUser)

  const handleCreateQuizClick = (idCat) => {
    // affichage d'une nouvelle page avec les questions de la categorie choisit
    // console.log("ID Categorie", idCat);
    navigation.navigate("Questions", { idCat });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button onPress={handleHome} title="< Retour" />
          <Text style={styles.title}>Faites un nouveau Quiz</Text>
        </View>
        <Text style={styles.subtitle}>Choisissez une catégorie :</Text>
        <View style={styles.categories}>
          {resultat &&
            resultat.map((item) => {
              return (
                <CardCategories
                  key={item.id}
                  name={item.name}
                  createQuizClick={() => handleCreateQuizClick(item.id)}
                />
              );
            })}
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categories: {
    flex: 1,
  },

});
