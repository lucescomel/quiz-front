import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuestionsStore } from "../lib/store/questionsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";

export default function Resultat({ navigation }) {
  const { point } = useQuestionsStore();

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Resultat</Text>
        <Text>Votre note est de : {point}/10</Text>
      </View>
      <Button onPress={handleHome} title="< Back" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
