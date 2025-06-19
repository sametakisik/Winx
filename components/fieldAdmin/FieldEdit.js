import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import WeekdaySelector from "../others/WeekdaySelector";

const FieldEdit = () => {
  const [fieldName, setFieldName] = useState("Barankaya Spor Sahası");
  const [openingTime, setOpeningTime] = useState("08:00");
  const [closingTime, setClosingTime] = useState("23:00");
  const [images, setImages] = useState([
    require("../../assets/saha.jpg"),
    require("../../assets/saha.jpg"),
    require("../../assets/saha.jpg"),
  ]);

  const formatTimeInput = (text, setTime) => {
    let formattedText = text.replace(/[^0-9]/g, "");

    if (formattedText.length > 2) {
      formattedText =
        formattedText.substring(0, 2) + ":" + formattedText.substring(2);
    }

    if (formattedText.length > 5) {
      formattedText = formattedText.substring(0, 5);
    }

    setTime(formattedText);
  };

  const handleAddImage = () => {
    Alert.alert(
      "Fotoğraf Ekle",
      "Bir seçenek seçin",
      [
        { 
          text: "Galeriden Seç", 
          onPress: pickImageFromLibrary,
          style: "default"
        },
        { 
          text: "Fotoğraf Çek", 
          onPress: takePhotoWithCamera,
          style: "default"
        },
        { 
          text: "İptal", 
          style: "cancel" 
        },
      ],
      { cancelable: true }
    );
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const pickImageFromLibrary = async () => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <View style={styles.imageHeader}>
            <Text style={styles.sectionTitle}>Fotoğraflar</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddImage}
            >
              <Ionicons name="add" size={24} color="#4CAF50" />
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
              <Text style={styles.emptyImageText}>Fotoğraf eklemek için dokunun</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Saha Bilgileri</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Saha Adı</Text>
            <TextInput
              value={fieldName}
              onChangeText={setFieldName}
              style={styles.input}
              placeholder="Saha adını girin"
              placeholderTextColor="#9E9E9E"
            />
          </View>

          <View style={styles.timeContainer}>
            <View style={[styles.formGroup, styles.timeInputGroup]}>
              <Text style={styles.label}>Açılış Saati</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons 
                  name="time-outline" 
                  size={20} 
                  color="#757575" 
                  style={styles.inputIcon}
                />
                <TextInput
                  value={openingTime}
                  onChangeText={(text) => formatTimeInput(text, setOpeningTime)}
                  style={[styles.input, styles.timeInput]}
                  keyboardType="numeric"
                  placeholder="09:00"
                  placeholderTextColor="#9E9E9E"
                  maxLength={5}
                />
              </View>
            </View>

            <View style={[styles.formGroup, styles.timeInputGroup]}>
              <Text style={styles.label}>Kapanış Saati</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons 
                  name="time-outline" 
                  size={20} 
                  color="#757575" 
                  style={styles.inputIcon}
                />
                <TextInput
                  value={closingTime}
                  onChangeText={(text) => formatTimeInput(text, setClosingTime)}
                  style={[styles.input, styles.timeInput]}
                  keyboardType="numeric"
                  placeholder="23:00"
                  placeholderTextColor="#9E9E9E"
                  maxLength={5}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Açık Günler</Text>
            <WeekdaySelector />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
  },
  addButtonText: {
    marginLeft: 5,
    color: "#4CAF50",
    fontWeight: "600",
  },
  imageContainer: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  deleteImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  emptyImageContainer: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  emptyImageText: {
    marginTop: 10,
    color: "#9E9E9E",
    fontSize: 16,
  },
  formContainer: {
    paddingHorizontal: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "white",
    color: "#333",
  },
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
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FieldEdit;