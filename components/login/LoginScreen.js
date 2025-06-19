import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import TextButton from "../UI/TextButton";
import { useUser } from "../../context/UserContext";
import DatePickerExample from "./SelectDate";
import { TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getUserById, loginUser } from "../../utils/UserApiService";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {userType, setUserType, setToken, token, setUser, user } = useUser();


  function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token parse hatası:", error);
    return null;
  }
}


const handleLoginPlayer = async () => {
 
 const owner = { 
   email: "can_6240@hotmail.com",
    password: "0123456789",
 }
  const user2 = {
    email: "karabulutanil54@gmail.com",
    password: "123123123s",
  };
  try {
    const response = await loginUser(user2);
    const parsedUser = parseJwt(response.token); 


    await setToken(response.token);
    const userFromApi = await getUserById(parsedUser.id, response.token); 

    setUser({...userFromApi, id: Number(parsedUser.id)}); 

    if (userFromApi.role === "Customer") {
      setUserType("Customer");
      navigation.replace("Ana sayfa");
    } else if (userFromApi.role === "Owner") {
      setUserType("Owner");
      navigation.replace("Ana sayfa");
    } else {
      Alert.alert("Bilinmeyen kullanıcı türü", userType );
    }

  } catch (error) {
    console.log("Hata login", error);
    Alert.alert("Giriş Başarısız", "Lütfen bilgilerinizi kontrol edin.");
  }
};


  const handleLoginField = () => {
   navigation.replace("Ana sayfa");
    setUserType("admin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        Giriş Yap
      </Text>

      <TextInput
        placeholder="Kullanıcı adınızı girin"
        label="Kullanıcı adı"
        value={userName}
        onChangeText={setUserName}
        mode="outlined" 
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        activeOutlineColor={Colors.primary}
        left={<TextInput.Icon icon="at" />}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifrenizi girin"
        label="Şifre"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        activeOutlineColor={Colors.primary}
        secureTextEntry
        left={
          <TextInput.Icon
            icon={() => (
              <Ionicons name="mail-outline" size={20} color="#007bff" />
            )}
          />
        }
      />

      <Button
        mode="contained-tonal"
        textStyle={styles.buttonText}
        onPress={handleLoginPlayer}
        buttonColor={Colors.primary} // arka plan rengini özelleştirme (isteğe bağlı)
        textColor="#fff"
      >
        Giriş Yap
      </Button>
   
      <View style={{ marginTop: 10 }}>
        <Button mode="text" onPress={() => navigation.replace("Kayıt1")}>
          Kayıt Ol
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
