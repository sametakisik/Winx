import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { registerCustomer } from "../../utils/UserApiService";
import {
  Dialog,
  Portal,
  RadioButton,
  TextInput,
  Button,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const positions = [
  "Forvet",
  "Orta Saha",
  "Sağ Bek",
  "Sol Bek",
  "Defans",
  "Kaleci",
];

const SignupScreen4 = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { registerData3 } = route.params;

  const [form, setForm] = useState({
    height: "",
    weight: "",
    footPreference: "",
    playingPosition: "",
  });

  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [visibleFoot, setVisibleFoot] = useState(false);
  const [selectedFoot, setSelectedFoot] = useState(form.footPreference);

  const foots = [
    { label: "Sağ", value: "Right" },
    { label: "Sol", value: "Left" },
  ];
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const togglePosition = (position) => {
    const current = form.playingPosition
      ? form.playingPosition.split(", ").filter(Boolean)
      : [];

    const updated = current.includes(position)
      ? current.filter((item) => item !== position)
      : [...current, position];

    const updatedString = updated.join(", ");
    setForm({ ...form, playingPosition: updatedString });
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoFile({ uri });
    }
  };

  const removeImage = () => {
    setPhotoFile(null);
  };

  const takePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      setDialogConfig({
        title: "İzin Gerekli",
        message: "Kamera erişimi gerekiyor!",
        actions: [{ text: "Tamam", onPress: hideDialog }],
      });
      showDialog("alert");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoFile({ uri });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries({
      birthday: "2025-06-13T14:17:00.000Z",
      city: "İstanbul",
      email: "arkadas@x.com",
      firstName: "arkk",
      gender: true,
      lastName: "merhaba",
      password: "1234567890",
      town: "Beşiktaş",
      userName: "arkadas",
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("height", 182);
    formData.append("weight", 70);
    formData.append("footPreference", "Right");
    formData.append("playingPosition", "Defans");
    formData.append("role", "Customer");
    
    if (photoFile) {
      const logoUri = photoFile.uri;
      const logoName = logoUri.split("/").pop();
      const logoType = "image/jpeg";

      formData.append("photoFiles", {
        uri: logoUri,
        name: logoName,
        type: logoType,
      });
    }

    console.log("vcxvxcv");

    try {
      await registerCustomer(formData);
      console.log("başarılı");
    } catch (error) {
      console.error("Kayıt sırasında bir hata oluştu");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <View style={styles.imageHeader}>
        <Text style={styles.label}>Profil Fotoğrafı</Text>
        <TouchableOpacity
          onPress={() => setVisiblePhoto(true)}
          style={styles.photoPreviewContainer}
        >
          {photoFile ? (
            <>
              <Image
                source={{ uri: photoFile.uri }}
                style={styles.photoPreview}
              />
              <View style={styles.photoOverlay}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
            </>
          ) : (
            <View style={styles.emptyPhotoBox}>
              <Ionicons name="camera" size={32} color={Colors.primary} />
              <Text style={styles.addImageButtonText}>Fotoğraf Ekle</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {photoFile && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photoFile.uri }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.deleteImageButton}
            onPress={removeImage}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={styles.input}
          label="Boy (cm)"
          placeholder="Boyunuzu girin. Örn: 185"
          keyboardType="numeric"
          mode="outlined"
          value={form.height}
          activeOutlineColor={Colors.primary}
          onChangeText={(text) => handleChange("height", text)}
        />
        <TextInput
          style={styles.input}
          label="Kilo (kg)"
          placeholder="Kilonuzu girin. Örn: 75"
          keyboardType="numeric"
          mode="outlined"
          value={form.weight}
          activeOutlineColor={Colors.primary}
          onChangeText={(text) => handleChange("weight", text)}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setVisibleFoot(true);
        }}
      >
        <TextInput
          label="Ayak Tercihiniz"
          value={
            form.footPreference === 0
              ? "Sağ"
              : form.footPreference === 1
              ? "Sol"
              : ""
          }
          editable={false}
          mode="outlined"
          style={styles.inputFoot}
          right={<TextInput.Icon icon="menu-down" />}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Mevki Seçimi:</Text>
      <View style={styles.cardContainer}>
        {positions.map((pos) => (
          <TouchableOpacity
            key={pos}
            style={[
              styles.card,
              form.playingPosition.split(", ").includes(pos) &&
                styles.cardSelected,
            ]}
            onPress={() => togglePosition(pos)}
          >
            <Text
              style={[
                styles.cardText,
                form.playingPosition.split(", ").includes(pos) &&
                  styles.cardTextSelected,
              ]}
            >
              {pos}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        fullWidth
        height={50}
        textStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        Kayıt Ol
      </Button>

      <Portal>
        <Dialog visible={visibleFoot} onDismiss={() => setVisibleFoot(false)}>
          <Dialog.Title>Ayak Tercihinizi Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => {
                  setSelectedFoot(value);
                }}
                value={selectedFoot}
              >
                {foots.map((item, index) => (
                  <RadioButton.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleFoot(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleChange("footPreference", selectedFoot);
                setVisibleFoot(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visiblePhoto} onDismiss={() => setVisiblePhoto(false)}>
          <Dialog.Title>Profil Fotoğrafı Ekleyin</Dialog.Title>
          <Dialog.Content>
            <Text>Bir işlem seçin:</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {photoFile && (
              <Button
                onPress={() => {
                  removeImage();
                  setVisiblePhoto(false);
                }}
              >
                Kaldır
              </Button>
            )}
            <Button
              onPress={() => {
                pickImage();
                setVisiblePhoto(false);
              }}
            >
              Galeriden Seç
            </Button>
            <Button
              onPress={() => {
                takePhoto();
                setVisiblePhoto(false);
              }}
            >
              Fotoğraf Çek
            </Button>
            <Button onPress={() => setVisiblePhoto(false)}>İptal</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cardSelected: {
    backgroundColor: Colors.primary,
  },
  cardText: {
    fontSize: 16,
    color: Colors.primary,
  },
  cardTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: "45%",
    marginRight: 15,
    marginBottom: 20,
    backgroundColor: "white",
  },
  inputFoot: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  photoPreviewContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",

    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  photoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPhotoBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});

export default SignupScreen4;
