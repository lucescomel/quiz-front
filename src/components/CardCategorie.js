import { Pressable, StyleSheet, Text, View } from "react-native";

export function CardCategories({ name, createQuizClick }) {
  return (
    <View>
      <Pressable style={styles.cards} onPress={createQuizClick}>
        <View>
          <Text>image here</Text>
        </View>
        <View>
          <Text>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  cards: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
});
