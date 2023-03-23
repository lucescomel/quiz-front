import { View, Text, StyleSheet } from "react-native";
// import React from "react";

export function UserConnected({ date, note, id }) {
    return(
    <View style={styles.container}>
        <Text> Date : {date} </Text>
        {/* <Text> Id : {id}  </Text> */}
        <Text> note : {note} </Text> 
        {/* <Text> catégories : {category} </Text> */}
    </View>
    );
}


const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "#FFFFFF",
    // },

});