import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";

import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import ChangeTeamLogo from "./ChangeTeamLogo";
import { useBottomSheet } from "../../BottomSheetContext";
import { Dialog, Portal, RadioButton, TextInput } from "react-native-paper";
import { deleteTeam, editTeam, getTeamById } from "../../utils/TeamApiService";
import { TEAM_LOGO } from "./CreateTeamScreen";
import { useUser } from "../../context/UserContext";

const location = {
  İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
  Ankara: ["Çankaya", "Keçiören", "Yenimahalle"],
  İzmir: ["Bornova", "Karşıyaka", "Konak"],
};

const EditTeam = () => {
  const route = useRoute();
  const { teamId } = route.params;
  const { openSheet } = useBottomSheet();
  const navigation = useNavigation();
const {token} = useUser()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={()=>setVisible(true)}>Takımı Sil</Button>,
    });
  }, [navigation]);

  const [team, setTeam] = useState({});
  const [selectedLogo, setSelectedLogo] = useState(null); // Logo state'i düzeltildi

  const handleChange = (key, value) => {
    setForm((prev) => {
      if (key === "city") {
        return { ...prev, city: value, town: "" };
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeamById(teamId, token);
      setTeam(team);
      // Takım verisi geldiğinde logoyu güncelle
      setSelectedLogo(team.logoUrl); // Bu satır eklendi
    };
    fetchTeam();
  }, []);

  const [form, setForm] = useState({
    name: "",
    city: "",
    town: "",
  });

  useEffect(() => {
    if (team && team.name) {
      setForm({
        name: team.name || "",
        city: team.city || "",
        town: team.town || "",
      });
      // Takım logosunu state'e aktar
      setSelectedLogo(team.logoUrl); // Bu satır eklendi
    }
  }, [team]);

  const [visibleCity, setVisibleCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState(form.city);
  const [visibleDistrict, setVisibleDistrict] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(form.town || "");

  const handleSubmit = async () => {
    const newForm = {
      name: form.name,
      city: form.city,
      town: form.town,
      content: "",
      logoUrl: !selectedLogo?.path ? team.logoUrl : String(selectedLogo?.path),
    };
    
   await editTeam(teamId, newForm)
    navigation.popToTop(); 
  navigation.replace("Takım Detayları", { teamId:teamId });
  };

  const [visible, setVisible] = useState();
  const handleDeleteTeam = async () => {
    await deleteTeam(teamId);
    console.log("başarılı");
    navigation.navigate("Takım Listesi")
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Takım Bilgilerini Düzenle</Text>
        <Text style={styles.subHeader}>{team.name}</Text>
      </View>

      <View style={styles.logoContainer}>
        {/* Seçilen logoyu göster */}
        <Image
          source={!selectedLogo?.path ? team.logoUrl : selectedLogo?.path}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => {
            openSheet(
              <ChangeTeamLogo
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
              />
            );
          }}
          style={styles.editIcon}
        >
          <Ionicons name="camera" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Takım Adı"
          placeholder="Takım adını girin"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          activeOutlineColor={Colors.primary}
          left={
            <TextInput.Icon
              icon={() => (
                <Ionicons
                  name="people"
                  size={20}
                  color={Colors.gray}
                  style={styles.inputIcon}
                />
              )}
            />
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setSelectedCity(form.city);
          setVisibleCity(true);
        }}
      >
        <TextInput
          label="Şehir"
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
          label="İlçe"
          value={form.town}
          editable={false}
          mode="outlined"
          disabled={!form.city}
          style={styles.input}
          right={<TextInput.Icon icon="menu-down" />}
        />
      </TouchableOpacity>

      <Button onPress={handleSubmit}>Kaydet</Button>

      <Portal>
        <Dialog visible={visibleCity} onDismiss={() => setVisibleCity(false)}>
          <Dialog.Title>Bir Seçenek Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => {
                  setSelectedCity(value);
                }}
                value={selectedCity}
              >
                {Object.keys(location)?.map((city) => (
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
                handleChange("city", selectedCity);
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
          <Dialog.Title>Bir Seçenek Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => setSelectedDistrict(value)}
                value={selectedDistrict}
              >
                {form.city &&
                  location[form.city]?.map((district) => (
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
                handleChange("town", selectedDistrict); // form'a aktar
                setVisibleDistrict(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Takımı Silin</Dialog.Title>
          <Dialog.Content>
            Takımı silmek istediğinize emin misiniz.
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleDeleteTeam();
                setVisible(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default EditTeam;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: Colors.primaryLight,
  },
  editIcon: {
    position: "absolute",
    right: "30%",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.darkGray,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "white",
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: Colors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    height: 50,
    backgroundColor: "white",
  },
  buttonWrapper: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: Colors.dark,
    paddingVertical: 12,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    color: Colors.dark,
    paddingVertical: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    right: 10,
  },
  placeholder: {
    color: Colors.gray,
  },
});
