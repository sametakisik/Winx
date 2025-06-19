import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  Dialog,
  Portal,
  TextInput,
  RadioButton,
  Button,
} from "react-native-paper";

const { width } = Dimensions.get('window');

export const TEAM_LOGO = [
  { id: 1, path: require("../../assets/team-logo/1.png") },
  { id: 2, path: require("../../assets/team-logo/2.png") },
  { id: 3, path: require("../../assets/team-logo/3.png") },
  { id: 4, path: require("../../assets/team-logo/4.png") },
  { id: 5, path: require("../../assets/team-logo/5.png") },
  { id: 6, path: require("../../assets/team-logo/6.png") },
  { id: 7, path: require("../../assets/team-logo/7.png") },
  { id: 8, path: require("../../assets/team-logo/8.png") },
  { id: 9, path: require("../../assets/team-logo/9.png") },
  { id: 10, path: require("../../assets/team-logo/10.png") },
  { id: 11, path: require("../../assets/team-logo/11.png") },
  { id: 12, path: require("../../assets/team-logo/12.png") },
  { id: 13, path: require("../../assets/team-logo/13.png") },
  { id: 14, path: require("../../assets/team-logo/14.png") },
  { id: 15, path: require("../../assets/team-logo/15.png") },
  { id: 16, path: require("../../assets/team-logo/16.png") },
  { id: 17, path: require("../../assets/team-logo/17.png") },
  { id: 18, path: require("../../assets/team-logo/18.png") },
  { id: 19, path: require("../../assets/team-logo/19.png") },
  { id: 20, path: require("../../assets/team-logo/20.png") },
  { id: 21, path: require("../../assets/team-logo/21.png") },
  { id: 22, path: require("../../assets/team-logo/22.png") },
  { id: 23, path: require("../../assets/team-logo/23.png") },
  { id: 24, path: require("../../assets/team-logo/24.png") },
  { id: 25, path: require("../../assets/team-logo/25.png") },
  { id: 26, path: require("../../assets/team-logo/26.png") },
  { id: 27, path: require("../../assets/team-logo/27.png") },
  { id: 28, path: require("../../assets/team-logo/28.png") },
  { id: 29, path: require("../../assets/team-logo/29.png") },
  { id: 30, path: require("../../assets/team-logo/30.png") },
  { id: 31, path: require("../../assets/team-logo/31.png") },
  { id: 32, path: require("../../assets/team-logo/32.png") },
  { id: 33, path: require("../../assets/team-logo/33.png") },
  { id: 34, path: require("../../assets/team-logo/34.png") },
  { id: 35, path: require("../../assets/team-logo/35.png") },
  { id: 36, path: require("../../assets/team-logo/36.png") },
  { id: 37, path: require("../../assets/team-logo/37.png") },
  { id: 38, path: require("../../assets/team-logo/38.png") },
  { id: 39, path: require("../../assets/team-logo/39.png") },
  { id: 40, path: require("../../assets/team-logo/40.png") },
];

const location = {
  İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
  Ankara: ["Çankaya", "Keçiören", "Yenimahalle"],
  İzmir: ["Bornova", "Karşıyaka", "Konak"],
  Bursa: ["Osmangazi", "Yıldırım", "Nilüfer"],
  Antalya: ["Muratpaşa", "Kepez", "Konyaaltı"],
  Adana: ["Seyhan", "Çukurova", "Yüreğir"],
  Konya: ["Selçuklu", "Meram", "Karatay"],
  Gaziantep: ["Şahinbey", "Şehitkamil", "Oğuzeli"],
  Kayseri: ["Melikgazi", "Kocasinan", "Talas"],
  Samsun: ["İlkadım", "Atakum", "Canik"],
  Eskişehir: ["Odunpazarı", "Tepebaşı"],
  Mersin: ["Yenişehir", "Mezitli", "Toroslar"],
  Trabzon: ["Ortahisar", "Akçaabat", "Yomra"],
  Erzurum: ["Yakutiye", "Palandöken", "Aziziye"],
  Malatya: ["Battalgazi", "Yeşilyurt"],
  Şanlıurfa: ["Haliliye", "Eyyübiye", "Karaköprü"],
  Kocaeli: ["İzmit", "Gebze", "Derince"],
  Denizli: ["Pamukkale", "Merkezefendi"],
  Manisa: ["Yunusemre", "Şehzadeler"],
};

const CreateTeam = () => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    town: "",
    logoUrl: "",
    content: "açıklama",
  });

  const [visibleCity, setVisibleCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState(form.city);
  const [visibleDistrict, setVisibleDistrict] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(form.town || "");
  const [selectedLogo, setSelectedLogo] = useState(null);
  
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setForm((prev) => {
      if (key === "city") {
        return { ...prev, city: value, town: "" };
      }
      return { ...prev, [key]: value };
    });

    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleNext}>İleri</Button>,
    });
  }, [navigation, form]);

  const handleNext = async () => {
    navigation.navigate("Oyuncu Ekleyin", {
      teamData: { ...form },
    });
  };

  const handleLogoSelect = (logoId) => {
    setSelectedLogo(logoId);
    handleChange("logoUrl", logoId.toString());
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Yeni Takım Oluştur</Text>

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
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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

      {/* Logo Seçim Bölümü */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Takım Logosu Seçin</Text>
        <Text style={styles.sectionSubtitle}>Mevcut logolardan birini seçin</Text>

        <FlatList
          data={TEAM_LOGO}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.logoGrid}
          columnWrapperStyle={styles.logoRow}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleLogoSelect(item.path)}
              style={[
                styles.logoContainer,
                selectedLogo === item.id && styles.selectedLogoContainer
              ]}
            >
              <Image 
                source={item.path} 
                style={styles.logoImage} 
                resizeMode="contain"
              />
              {selectedLogo === item.id && (
                <View style={styles.selectedBadge}>
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Şehir Seçim Dialog */}
      <Portal>
        <Dialog visible={visibleCity} onDismiss={() => setVisibleCity(false)}>
          <Dialog.Title>Şehir Seçin</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 300 }}>
              <RadioButton.Group
                onValueChange={(value) => {
                  setSelectedCity(value);
                }}
                value={selectedCity}
              >
                {Object.keys(location).map((city) => (
                  <RadioButton.Item 
                    key={city} 
                    label={city} 
                    value={city} 
                    labelStyle={styles.radioLabel}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleCity(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleChange("city", selectedCity);
                setVisibleCity(false);
              }}
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* İlçe Seçim Dialog */}
      <Portal>
        <Dialog
          visible={visibleDistrict}
          onDismiss={() => setVisibleDistrict(false)}
        >
          <Dialog.Title>İlçe Seçin</Dialog.Title>
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
                      labelStyle={styles.radioLabel}
                    />
                  ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDistrict(false)}>İptal</Button>
            <Button
              onPress={() => {
                handleChange("town", selectedDistrict);
                setVisibleDistrict(false);
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  logoGrid: {
    paddingBottom: 20,
  },
  logoRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  logoContainer: {
    width: (width - 60) / 3, // 20 padding * 2 + 10 gap * 2
    height: (width - 60) / 3,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  selectedLogoContainer: {
    borderColor: Colors.primary,
    backgroundColor: '#f0f7ff',
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  selectedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default CreateTeam;