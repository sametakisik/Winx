import { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { addEquipment } from "../../utils/EquipmentsApiService";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import {
  Dialog,
  Portal,
  Button,
  Paragraph,
  Card,
  TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useBottomSheet } from "../../BottomSheetContext";

const EquipmentAdd = ({
  newEquipment,
  fetchEquipments,
  setNewEquipment,
  facilityId,
  screenType,
}) => {
  const { closeSheet } = useBottomSheet();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isRentable, setIsRentable] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const pickImage = async () => {
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

  const handleSubmitCreateFacilityScreen = () => {
    setNewEquipment({
      name: name,
      description: description,
      isRentable: isRentable,
      price: price,
      quantity: quantity,
      photoFiles: photoFile ? [photoFile] : [],
    });
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setIsRentable(false);
    setPhotoFile(null);
  };

  const handleSubmitFacilityScreen = async () => {
    const newEquipment = {
      name: name,
      isRentable: isRentable,
      price: price,
      quantity: quantity,
      photoFiles: photoFile ? [photoFile] : [],
      description: description,
    };

    const formData = new FormData();

    formData.append("name", name);
    formData.append("isRentable", isRentable);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("name", name);

    if (photoFile) {
      formData.append("photoFiles", {
        uri: photoFile.uri,
        name: "equipment.jpg",
        type: "image/jpeg",
      });
    }

    try {
      await addEquipment(facilityId, formData);
     fetchEquipments()
      closeSheet();
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setIsRentable(false);
      setPhotoFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addImage = () => {
    showDialog("photoFile");
  };

  const removeImage = () => {
    setPhotoFile(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Yeni Ekipman Ekle</Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Ekipman Türü"
              placeholder="Tür girin (örn: Krampon, Eldiven)"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.primary}
              left={
                <TextInput.Icon
                  icon={() => (
                    <FontAwesome
                      name="soccer-ball-o"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                />
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Ekipman Markası"
              placeholder="Marka girin (örn: Adidas, Nike)"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.primary}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Ionicons
                      name="logo-react"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                />
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Ekipman Fiyatı"
              placeholder="Saatlik ekipman fiyatı (₺) girin"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.primary}
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
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Ekipman Adedi"
              placeholder="Adet girin"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.primary}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Octicons
                      name="number"
                      size={20}
                      color={Colors.primary}
                      style={styles.icon}
                    />
                  )}
                />
              }
            />
          </View>

          <View style={[styles.switchRow, styles.inputGroup]}>
            <Text style={styles.switchLabel}>Kiralık mı?</Text>
            <Switch
              value={isRentable}
              onValueChange={setIsRentable}
              thumbColor={isRentable ? Colors.primary : "#f4f3f4"}
              trackColor={{ false: "#767577", true: Colors.primaryLight }}
            />
          </View>

          <View style={styles.imageHeader}>
            <Text style={styles.switchLabel}>Ekipmanın Fotoğrafı</Text>
            <TouchableOpacity onPress={addImage} style={styles.addImageButton}>
              <Ionicons name="add" size={24} color={Colors.primary} />
              <Text style={styles.addImageButtonText}>
                {photoFile ? "Değiştir" : "Ekle"}
              </Text>
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

          <TouchableOpacity
            style={[
              styles.addButton,
              (!name || !description || !price || !quantity) &&
                styles.disabledButton,
            ]}
            onPress={
              screenType === "facilityPage"
                ? handleSubmitFacilityScreen
                : screenType === "createFacilityPage"
                ? handleSubmitCreateFacilityScreen
                : null
            }
            disabled={!name || !description || !price || !quantity}
          >
            <Text style={styles.buttonText}>Ekipman Ekle</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Ekipmanın Fotoğrafını Ekle</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Bir seçenek seçin</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                pickImage();
                hideDialog();
              }}
            >
              Galeriden Seç
            </Button>
            <Button
              onPress={() => {
                takePhoto();
                hideDialog();
              }}
            >
              Fotoğraf Çek
            </Button>
            <Button onPress={hideDialog}>İptal</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  card: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: Colors.primaryDark,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
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
  addImageButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addImageButtonText: {
    marginLeft: 5,
    color: Colors.primary,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  deleteImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00000088",
    borderRadius: 20,
    padding: 5,
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  switchLabel: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EquipmentAdd;
