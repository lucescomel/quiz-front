import { View, Text, StyleSheet } from "react-native";
// import React from "react";

export function UserConnected({ date, category }) {
    return(
    <View style={styles.container}>
        {/* <Text> Id : {id}  </Text>
        <Text> note : {note} </Text> */}
        <Text> date : {date} </Text>
        <Text> catégories : {category} </Text>
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

});