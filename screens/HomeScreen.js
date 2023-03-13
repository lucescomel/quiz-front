import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View style={{ marginTop: "15%" }}>
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        HomeScreen
      </Text>
      <Image
        style={{
          height: 270,
          width: "100%",
          resizeMode: "contain",
          alignItems: "center",
          borderRadius: 6,
        }}
        source={{
          uri: "https://www.orientaction-groupe.com/wp-content/uploads/2021/07/iStock-1223692043.jpg",
        }}
      />

      <View
        style={{
          padding: 10,
          alignItems: "center",
         
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            padding: 10,
            marginTop: 10,
            backgroundColor: "#FC633A",
            borderRadius: 6
          }}
        >
          Bienvenu sur le quiz de révision de la formation
        </Text>
      </View>


      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
