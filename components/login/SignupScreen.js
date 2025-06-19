import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    navigation.navigate("Kayıt2", { registerData1: form });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Adınızı girin"
        label="Ad"
        mode="outlined"
        activeOutlineColor={Colors.primary}
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Soyadınızı girin"
        label="Soyad"
        mode="outlined"
        activeOutlineColor={Colors.primary}
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta adresinizi girin"
        label="E-posta Adresi"
        mode="outlined"
        activeOutlineColor={Colors.primary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı adınızı girin"
        label="Kullanıcı Adı"
        mode="outlined"
        activeOutlineColor={Colors.primary}
        autoCapitalize="none"
        value={form.userName}
        onChangeText={(text) => handleChange("userName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre belirleyin"
        label="Şifre"
        mode="outlined"
        activeOutlineColor={Colors.primary}
        autoCapitalize="none"
        value={form.password}
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      <Button
        mode="contained-tonal"
        //  textStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        İleri
      </Button>
      <View style={styles.signText}>
        <Text style={{ marginRight: 8 }}>Hesabın var mı?</Text>
        <Button mode="text" onPress={()=>navigation.replace("Giriş")}>
          Giriş Yap
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
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
  signText: { flexDirection: "row", alignItems: "center", alignSelf: "center" },
});

export default SignupScreen;
