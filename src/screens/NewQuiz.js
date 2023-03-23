import { Text, View, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { connectToken } from "../utils/connectToken";
import { CardCategories } from "../components/CardCategorie";

export default function NewQuizzScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [resultat, setResultat] = useState([]);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };
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
        "https://quiz-luc.projets.lecoledunumerique.fr/apip/categories",
        config
      )
        .then(async function (response) {
          const res = await response.json();
          console.log("resultat Categories :", res["hydra:member"]);
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
    console.log("ID Categorie", idCat);
    navigation.navigate("Questions", { idCat });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={handleGoBack}>
          <Text>Back</Text>
        </Pressable>
        <Text style={styles.text}>Faites un nouveau Quiz</Text>
        <Text>Choisissez une catÃ©gorie :</Text>
        <View>
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
    backgroundColor: "#9985E0",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  button: {
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#d380ed",
    marginBottom: 50,
  },
});
