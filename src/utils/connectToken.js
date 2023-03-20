import AsyncStorage from "@react-native-async-storage/async-storage";

export const connectToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token_key");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};