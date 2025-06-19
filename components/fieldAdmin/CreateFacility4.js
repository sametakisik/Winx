import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dialog, Portal, Button, Paragraph } from "react-native-paper";

import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createFacility } from "../../utils/FacilityApiService";

const CreateFacility4 = () => {
  const [form, setForm] = useState({
    logoFile: "",
    photoFiles: [],
  });
  const [visible, setVisible] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    actions: [],
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { facilityData } = route.params;

  const showDialog = (type) => {
    setDialogType(type);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const pickImage = async (type) => {
    hideDialog();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (type === "logoFile") {
        setForm((prev) => ({ ...prev, logoFile: { uri } }));
      } else {
        setForm((prev) => ({
          ...prev,
          photoFiles: [...prev.photoFiles, { uri }],
        }));
      }
    }
  };

  const takePhoto = async (type) => {
    hideDialog();
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
      if (type === "logoFile") {
        setForm((prev) => ({ ...prev, logoFile: { uri } }));
      } else {
        setForm((prev) => ({
          ...prev,
          photoFiles: [...prev.photoFiles, { uri }],
        }));
      }
    }
  };

  const handleImageAdd = (type) => {
    setDialogConfig({
      title: type === "logoFile" ? "Logo Ekle" : "Fotoğraf Ekle",
      message: "Bir seçenek seçin",
      actions: [
        {
          text: "Galeriden Seç",
          onPress: () => pickImage(type),
        },
        {
          text: "Fotoğraf Çek",
          onPress: () => takePhoto(type),
        },
      ],
    });
    showDialog("options");
  };

  const removeImage = (index) => {
    const newImages = [...form.photoFiles];
    newImages.splice(index, 1);
    setForm((prev) => ({ ...prev, photoFiles: newImages }));
  };

const handleSubmit = async () => {
  const formData = new FormData();

  // facilityData içindeki verileri FormData'ya ekle
  Object.entries(facilityData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Logo dosyasını ekle
  if (form.logoFile) {
    const logoUri = form.logoFile.uri;
    const logoName = logoUri.split("/").pop();
    const logoType = "image/jpeg"; // MIME tipi tespiti dinamik yapılabilir

    formData.append("logoFile", {
      uri: logoUri,
      name: logoName,
      type: logoType,
    });
  }

  form.photoFiles.forEach((file, index) => {
    const photoUri = file.uri;
    const photoName = photoUri.split("/").pop();
    const photoType = "image/jpeg";

    formData.append("photoFiles", {
      uri: photoUri,
      name: photoName,
      type: photoType,
    });
  });

navigation.navigate("Ekipman Ekleyin", {formData: formData})
};



  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.formGroup}>
        <View style={styles.imageHeader}>
          <Text style={styles.label}>Logo</Text>
          <TouchableOpacity
            onPress={() => handleImageAdd("logoFile")}
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color={Colors.primary} />
            <Text style={styles.addButtonText}>
              {form.logoFile ? "Değiştir" : "Ekle"}
            </Text>
          </TouchableOpacity>
        </View>

        {form.logoFile ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: form.logoFile.uri }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.deleteImageButton}
              onPress={() => setForm((prev) => ({ ...prev, logoFile: "" }))}
            >
              <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.emptyImageContainer}
            onPress={() => handleImageAdd("logoFile")}
          >
            <Ionicons name="images" size={48} color="#9E9E9E" />
            <Text style={styles.emptyImageText}>Logo eklemek için dokunun</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Fotoğraflar */}
      <View style={styles.formGroup}>
        <View style={styles.imageHeader}>
          <Text style={styles.label}>Fotoğraflar</Text>
          <TouchableOpacity
            onPress={() => handleImageAdd("photo")}
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color={Colors.primary} />
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>

        {form.photoFiles.length > 0 ? (
          <FlatList
            data={form.photoFiles}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.deleteImageButton}
                  onPress={() => removeImage(index)}
                >
                  <MaterialIcons name="delete" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <TouchableOpacity
            style={styles.emptyImageContainer}
            onPress={() => handleImageAdd("photo")}
          >
            <Ionicons name="images" size={48} color="#9E9E9E" />
            <Text style={styles.emptyImageText}>
              Fotoğraf eklemek için dokunun
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.submitButtonText}>İleri</Text>
      </TouchableOpacity>

      {/* Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{dialogConfig.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogConfig.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            {dialogType === "options" && (
              <Button onPress={hideDialog}>İptal</Button>
            )}
            {dialogConfig.actions.map((action, index) => (
              <Button key={index} onPress={action.onPress}>
                {action.text}
              </Button>
            ))}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    marginLeft: 5,
    color: Colors.primary,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
    alignItems: "center",
  },
  carouselImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  deleteImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#00000088",
    borderRadius: 20,
    padding: 4,
  },
  emptyImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  emptyImageText: {
    marginTop: 10,
    color: "#9E9E9E",
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
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default CreateFacility4