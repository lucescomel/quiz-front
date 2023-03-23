import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionScreen({ navigation, route }) {
  const handleGoBack = () => {
    navigation.navigate("Home");
  };
  const categoryId = route.params;
  console.log("PaGE QUESTION CATEGORIE : ", categoryId);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable onPress={handleGoBack}>
        <Text>Back</Text>
      </Pressable>
      <View>
        <Text>Question</Text>
        <View>
          <Text>Titre Question</Text>
          <Pressable>
            <Text>Map sur les 4 reponses</Text>
          </Pressable>
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
});