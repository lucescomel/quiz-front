import AsyncStorage from "@react-native-async-storage/async-storage";


export  const connectToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token_key");
      const config = {
        headers : { Authorization: `Bearer ${token}` },
      }
      
    } catch (error) {
      
    }
  }