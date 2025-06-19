import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectDate from "./SelectDate";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import {
  Dialog,
  Portal,
  RadioButton,
  TextInput,
  Button,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const SignupScreen2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { registerData1 } = route.params;

  const [form, setForm] = useState({
    city: "",
    town: "",
    gender: "",
    birthday: date,
  });

  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [visibleCity, setVisibleCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState(form.city);
  const [visibleDistrict, setVisibleDistrict] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(form.town || "");
  const [visibleGender, setVisibleGender] = useState(false);
  const [selectedGender, setSelectedGender] = useState(form.gender);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCityChange = (key, value) => {
    setForm((prev) => {
      if (key === "city") {
        return { ...prev, city: value, town: "" };
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      city: selectedCity,
      town: selectedDistrict,
      birthday: date,
    }));
  }, [selectedCity, selectedDistrict, date]);



  const handleSubmit = () => {
    navigation.navigate("Kayıt3", {
      registerData2: { ...registerData1, ...form },
    });
  };

const onChangeDate = (event, selectedDate) => {
  setShowDate(false);
  if (selectedDate) {
    setDate(selectedDate);
  }
};

console.log(date);

  const location = {
    İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
    Ankara: ["Çankaya", "Keçiören", "Yenimahalle"],
    İzmir: ["Bornova", "Karşıyaka", "Konak"],
  };

  const genders = [
    { label: "Erkek", value: true },
    { label: "Kadın", value: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>


      
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCity(form.city);
            setVisibleCity(true);
          }}
        >
          <TextInput
            label="Yaşadığınız Şehir"
            value={form.city}
            editable={false}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="menu-down" />}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (!form.city) {
              alert("Lütfen önce bir şehir seçin");
              return;
            }
            setSelectedDistrict(form.town);
            setVisibleDistrict(true);
          }}
        >
          <TextInput
            label="Yaşadığınız İlçe"
            value={form.town}
            editable={false}
            mode="outlined"
            disabled={!form.city}
            style={styles.input}
            right={<TextInput.Icon icon="menu-down" />}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVisibleGender(true);
          }}
        >
          <TextInput
            label="Cinsiyetiniz"
            value={
              form.gender === true
                ? "Erkek"
                : form.gender === false
                ? "Kadın"
                : ""
            }
            editable={false}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="menu-down" />}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setShowDate(true)}>
        <TextInput
          label="Doğum Tarihi"
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


      <Button
        fullWidth
        height={50}
        textStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        İleri
      </Button>

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


      <Portal>
        <Dialog visible={visibleCity} onDismiss={() => setVisibleCity(false)}>
          <Dialog.Title>Yaşadığınız Şehri Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => {
                  setSelectedCity(value);
                }} // geçici olarak güncelle
                value={selectedCity}
              >
                {Object.keys(location).map((city) => (
                  <RadioButton.Item key={city} label={city} value={city} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleCity(false)}>İptal</Button>
            <Button
              onPress={() => {
                // form'a aktar
                handleCityChange("city", selectedCity);
                setVisibleCity(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={visibleDistrict}
          onDismiss={() => setVisibleDistrict(false)}
        >
          <Dialog.Title>Yaşadığınız İlçeyi Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => setSelectedDistrict(value)}
                value={selectedDistrict}
              >
                {form.city &&
                  location[form.city].map((district) => (
                    <RadioButton.Item
                      key={district}
                      label={district}
                      value={district}
                    />
                  ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDistrict(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleCityChange("town", selectedDistrict); // form'a aktar
                setVisibleDistrict(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={visibleGender}
          onDismiss={() => setVisibleGender(false)}
        >
          <Dialog.Title>Cinsiyetinizi Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => {
                  setSelectedGender(value);
                }}
                value={selectedGender}
              >
                {genders.map((item, index) => (
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
            <Button onPress={() => setVisibleGender(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleChange("gender", selectedGender);
                setVisibleGender(false);
              }}
            >
              Tamam
            </Button>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  photoPreviewContainer: {
  width: 120,
  height: 120,
  borderRadius: 60,
  alignSelf: "center",
  marginVertical: 10,
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
export default SignupScreen2;
