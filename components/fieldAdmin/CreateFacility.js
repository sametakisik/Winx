import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const CreateFacility = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    bankAccountInfo: "12345",
  });
  const [iban, setIban] = useState("");
  const navigation = useNavigation();

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const formatIban = (text) => {
    // Sadece harf ve rakam kalsın
    let cleaned = text.replace(/[^A-Za-z0-9]/g, "");

    // 4'erli gruplara ayır
    let formatted = cleaned.match(/.{1,4}/g)?.join(" ") ?? "";

    setIban(formatted.toUpperCase());
  };

  const handleSubmit = () => {
    // Basic validation
/*
    const newErrors = {};
    if (!form.name) newErrors.name = "Tesis adı zorunludur";
    if (!form.phone) newErrors.phone = "Telefon numarası zorunludur";
    if (!form.email) newErrors.email = "E-posta adresi zorunludur";
    if (!form.bankAccountInfo)
      newErrors.bankAccountInfo = "Banka hesap numarası zorunludur";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
*/
    navigation.navigate("Konum Bilgilerini Ekle", {
      facilityData: { ...form },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Yeni Tesis Oluştur</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Tesis Adı"
            placeholder="Tesis adını girin"
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="stadium" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Telefon Numarası"
            placeholder="Telefon numaranızı girin"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            autoCapitalize="none"
            keyboardType="phone-pad"
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="phone" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="E-posta Adresi"
            placeholder="E-posta adresinizi girin"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="email" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Banka Hesap Numarası"
            placeholder="IBAN numaranızı girin"
            value={form.bankAccountInfo}
            onChangeText={formatIban}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            activeOutlineColor={Colors.primary}
            labelStyle={styles.submitButtonText}
            left={
              <TextInput.Icon
                icon={() => (
                  <FontAwesome
                    name="turkish-lira"
                    size={20}
                    color={Colors.primary}
                    style={styles.icon}
                  />
                )}
              />
            }
          />
          {errors.bankAccountInfo && (
            <Text style={styles.errorText}>{errors.bankAccountInfo}</Text>
          )}
        </View>

        <Button
          mode="contained-tonal"
          onPress={handleSubmit}
          buttonColor={Colors.primary}
          textColor="#fff"
          style={styles.button}
          labelStyle={{ fontSize: 16, fontWeight: "semi-bold" }}
        >
          İleri
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
    fontWeight: "500",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "white",
  },
  errorInput: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginTop:4
  },
  button: {
    justifyContent: "center",
    width: "30%",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    color: "#333",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    color: "#333",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    right: 10,
    top: 10,
  },
  placeholder: {
    color: "#999",
  },
});

export default CreateFacility;
