import { View, Text } from "react-native";
// import React from "react";

export function UserConnected({ note, id, date }) {
    return(
    <View>
        <Text> Id : {id}  </Text>
        <Text> note : {note} </Text>
        <Text> date : {date} </Text>
    </View>
    );
}