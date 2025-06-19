import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import { addAnnouncement } from "../../utils/AnnouncementsApiService";
import { Button, Card, Dialog, Portal, TextInput } from "react-native-paper";
import { useBottomSheet } from "../../BottomSheetContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const AnnouncementCreate = ({ facilityId, fetchAnnouncement }) => {
  const { closeSheet } = useBottomSheet();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) {
      setDate(new Date(selectedDate));
    }
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
    const newErrors = {};
    if (!title) newErrors.title = "Duyuru başlığı zorunludur";
    if (!content) newErrors.content = "Açıklama zorunludur";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date.toISOString()); // tarih de eklenmeli

    if (photoFile) {
      formData.append("photoFile", {
        uri: photoFile.uri,
        name: "announcement.jpg",
        type: "image/jpeg",
      });
    }
    console.log(formData);
    try {
      await addAnnouncement(facilityId, formData);
      fetchAnnouncement();
      closeSheet();
      setTitle("");
      setContent("");
      setDate(new Date());
      setPhotoFile(null);

      console.log("başarılı");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.header}>Yeni Duyuru Oluştur</Text>
        </Card.Content>

        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Başlık girin"
            label="Duyuru Başlığı"
            mode="outlined"
            activeOutlineColor={Colors.primary}
            value={title}
            onChangeText={setTitle}
          />

          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Açıklama girin"
            label="Duyuru Açıklaması"
            mode="outlined"
            activeOutlineColor={Colors.primary}
            value={content}
            onChangeText={setContent}
            maxLength={200}
            multiline
            numberOfLines={6} // yüksekliği belirler
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {errors.content && (
              <Text style={styles.errorText}>{errors.content}</Text>
            )}

            <Text style={styles.counter}>{content.length}/200</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={{ marginBottom: 10 }}
        >
          <TextInput
            label="Duyuru Tarihi"
            value={date.toLocaleDateString()}
            editable={false}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="calendar" />}
          />
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            mode="date"
            display="default"
            value={date}
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>Fotoğraf Ekle (Opsiyonel)</Text>
        <TouchableOpacity
          style={[styles.imagePicker, photoFile && { height: 200 }]}
          onPress={() => setVisiblePhoto(true)}
        >
          {photoFile ? (
            <Image source={photoFile} style={styles.image} />
          ) : (
            <Text style={styles.imagePickerText}>+ Fotoğraf Seç</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Duyuruyu Yayınla</Text>
        </TouchableOpacity>
      </Card>

      <Portal>
        <Dialog visible={visiblePhoto} onDismiss={() => setVisiblePhoto(false)}>
          <Dialog.Title>Fotoğraf Ekleyin</Dialog.Title>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#34495e",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginVertical: 5,
  },
  errorInput: {
    borderColor: "#e74c3c",
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#fff",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  imagePickerText: {
    color: "#7f8c8d",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  counter: {
    textAlign: "right",
    alignSelf: "flex-end",
    marginTop: 4,
    color: "#333",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnnouncementCreate;
