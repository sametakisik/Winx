import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as Location from "expo-location";
import TextButton from "../UI/TextButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const data = {
  İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
  Ankara: ["Çankaya", "Keçiören", "Yenimahalle"],
  İzmir: ["Bornova", "Karşıyaka", "Konak"],
};

const SelectLocation = ({ onLocationChange }) => {
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  const cityOptions = Object.keys(data).map((city) => ({
    label: city,
    value: city,
  }));
  const districtOptions = selectedCity
    ? data[selectedCity].map((district) => ({
        label: district,
        value: district,
      }))
    : [];

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedDistrict(null);
    onLocationChange?.(value, null);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    onLocationChange?.(selectedCity, value);
  };

  const handleAutoDetect = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("İzin Gerekli", "Konum izni verilmedi.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync(location.coords);

      if (geocode.length > 0) {
        const place = geocode[0];
        const autoCity = place.region;
        const autoDistrict = place.subregion;

        if (data[autoCity] && data[autoCity].includes(autoDistrict)) {
          setSelectedCity(autoCity);
          setSelectedDistrict(autoDistrict);
          onLocationChange?.(autoCity, autoDistrict);
        } else {
          Alert.alert(
            "Uyarı",
            `Konum verileri mevcut şehir listesinde bulunamadı: ${autoCity} / ${autoDistrict}`
          );
        }
      }
    } catch (error) {
      Alert.alert("Hata", "Konum alınırken bir sorun oluştu.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Konumunuzu ayarlayın</Text>
        <TextButton textStyle={styles.textButton} onPress={handleAutoDetect}>
          Otomatik bul
        </TextButton>
      </View>

      <Text style={styles.label}>İl Seçin</Text>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          placeholder={{ label: "Bir il seçin...", value: null }}
          useNativeAndroidPickerStyle={false}
          onValueChange={handleCityChange}
          items={cityOptions}
          value={selectedCity}
          style={pickerSelectStyles}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={25}
              marginTop="20%"
              color={Colors.primary}
            />
          )}
        />
      </View>

      {selectedCity && (
        <>
          <Text style={styles.label}>İlçe Seçin</Text>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              placeholder={{ label: "Bir ilçe seçin...", value: null }}
              useNativeAndroidPickerStyle={false}
              onValueChange={handleDistrictChange}
              items={districtOptions}
              disabled={!selectedCity}
              value={selectedDistrict}
              style={pickerSelectStyles}
              Icon={() => (
                <Ionicons
                  name="chevron-down"
                  size={25}
                  marginTop="20%"
                  color={Colors.primary}
                />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  textButton: {
    color: "#006de9",
    marginTop: 10,
    marginBottom: 10,
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

export default SelectLocation;
