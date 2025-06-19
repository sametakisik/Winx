import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import SelectFacilityLocation from "../others/SelectFacilityLocation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";

const CreateFacility2 = () => {
  const route = useRoute();
  const { facilityData } = route.params;

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    city: "",
    town: "",
    address: "",
    addressDetails: "",
  });

  const [errors, setErrors] = useState({});
  console.log(errors);

  const [region, setRegion] = useState({
    latitude: 41.015137,
    longitude: 28.97953,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  console.log(selectedLocation);

  const handleCityChange = async (text) => {
    handleChange("city", text);
    setFormData((prev) => ({ ...prev, city: text }));
    if (text.length < 2) return;

    try {
      const geoResults = await Location.geocodeAsync(text + ", Turkey");
      if (geoResults.length > 0) {
        const { latitude, longitude } = geoResults[0];
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        };
        setRegion(newRegion);
        setSelectedLocation({ latitude, longitude });

        // İlçe ve adresi temizle
        setFormData((prev) => ({ ...prev, town: "", address: "" }));
      }
    } catch (error) {
      console.log("Şehir bulunamadı:", error);
    }
  };
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const handleSubmit = () => {
    // Doğrulama örneği
    /*
    const newErrors = {};
    if (!formData.city) newErrors.city = "Şehir zorunludur";
    if (!formData.addressDetails)
      newErrors.addressDetails = "Adres detayları zorunludur";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
      */
    navigation.navigate("Tesis Özelliklerini Ekle", {
      facilityData: { ...facilityData, ...selectedLocation, ...formData},
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 320 }}>
        <SelectFacilityLocation
          setCity={(city) => setFormData((prev) => ({ ...prev, city }))}
          setDistrict={(town) => setFormData((prev) => ({ ...prev, town }))}
          setAddress={(address) =>
            setFormData((prev) => ({ ...prev, address }))
          }
          region={region}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Şehir"
            placeholder="Tesisinizin bulunduğu şehri girin veya haritadan seçin"
            value={formData.city}
            onChangeText={handleCityChange}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            autoCapitalize="none"
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="stadium" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="İlçe"
            //     placeholder="Tesisinizin bulunduğu şehri girin veya haritadan seçin"

            onChangeText={handleCityChange}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            value={formData.town}
            editable={false}
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="stadium" size={20} color={Colors.primary} />
                )}
              />
            }
          />
        </View>

         <View style={styles.inputContainer}>
          <TextInput
            label="Adres"
            onChangeText={handleCityChange}
            mode="outlined" // outlined, flat gibi modlar var
            style={styles.input}
            value={formData.address}
            editable={false}
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon
              name="map"
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
            label="Adres Detayı"
            placeholder="Tesisinizin tam adresini yazın"
            value={formData.addressDetails}
             onChangeText={(text) => handleChange("addressDetails", text)}
            mode="outlined" 
            style={styles.input}
              multiline
              numberOfLines={4}
            activeOutlineColor={Colors.primary}
            left={
              <TextInput.Icon
                icon={() => (
                 <Icon
              name="home"
              size={20}
              color={Colors.primary}
              style={[styles.icon,]}
            />
                )}
              />
            }
          />
          {errors.addressDetails && <Text style={styles.errorText}>{errors.addressDetails}</Text>}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.submitButtonText}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
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
  icon: {
    marginRight: 5,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorInput: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginTop: 5,
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
export default CreateFacility2;
