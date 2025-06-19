import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WeekdaySelector from "../others/WeekdaySelector";
import { Colors } from "../../constants/Colors";
import { useRoute } from "@react-navigation/native";
import { addField } from "../../utils/FieldApiService";
import { TextInput, Dialog, Portal, Button, Provider } from "react-native-paper";

const CreateField2 = () => {
  const [form, setForm] = useState({
    weeklyOpenings: [],
    photoFiles: [],
    pricePerHour: "",
  });

  const [visible, setVisible] = useState(false); // For Paper Dialog

  const route = useRoute();
  const { fieldData } = route.params;

  const [openingDays, setOpeningDays] = useState([]);

  const setImages = (newImages) => {
    setForm((prev) => ({
      ...prev,
      photoFiles: newImages,
    }));
  };

  const images = form.photoFiles;

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      weeklyOpenings: openingDays,
    }));
  }, [openingDays]);

  const handleAddImage = () => {
    setVisible(true); // Show the Paper Dialog
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const pickImageFromLibrary = async () => {
    hideDialog();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  const takePhotoWithCamera = async () => {
    hideDialog();
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Kamera erişimi gerekiyor!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const formatPriceInput = (text) => {
    const formattedText = text.replace(/[^0-9.]/g, "");
    const parts = formattedText.split(".");
    if (parts.length > 2) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      pricePerHour: formattedText,
    }));
  };

  const handleSubmit = async () => {

 const formData = new FormData();

  Object.entries(fieldData).forEach(([key, value]) => {
    formData.append(key, value);
  });

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

formData.append("weeklyOpenings", form.weeklyOpenings)
formData.append("pricePerHour", form.pricePerHour)

    try {
      await addField(formData);
      console.log("başarılı");
    } catch (error) {
      alert("Saha oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Açık Günler</Text>
          <WeekdaySelector
            selectedDays={openingDays}
            setSelectedDays={setOpeningDays}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.imageHeader}>
            <Text style={styles.label}>Fotoğraflar</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
              <Ionicons name="add" size={24} color={Colors.primary} />
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>

          {images.length > 0 ? (
            <FlatList
              data={images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={typeof item === "number" ? item : { uri: item.uri }}
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
              onPress={handleAddImage}
            >
              <Ionicons name="images" size={48} color="#9E9E9E" />
              <Text style={styles.emptyImageText}>
                Fotoğraf eklemek için dokunun
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <TextInput
            label="Saatlik Saha Ücreti"
            placeholder="Ücreti ₺ cinsinden belirleyiniz"
            value={form.pricePerHour}
            onChangeText={formatPriceInput}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons
                    name="currency-lira"
                    size={20}
                    color={Colors.primary}
                  />
                )}
              />
            }
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.submitButtonText}>Oluştur</Text>
        </TouchableOpacity>

        {/* Paper Dialog for image selection */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Fotoğraf Ekle</Dialog.Title>
            <Dialog.Content>
              <Text>Bir seçenek seçin</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={pickImageFromLibrary}>Galeriden Seç</Button>
              <Button onPress={takePhotoWithCamera}>Fotoğraf Çek</Button>
              <Button onPress={hideDialog}>İptal</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeInputGroup: {
    width: "48%",
  },
  timeInput: {
    paddingLeft: 40,
  },
  inputWithIcon: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1,
  },
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
    input: {
    backgroundColor: "white",
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

export default CreateField2;
