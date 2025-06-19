import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function SelectFacilityLocation({
  setCity,
  setDistrict,
  setAddress,
  region,
  selectedLocation,
  setSelectedLocation,
}) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Konum izni reddedildi");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    try {
      const [geoInfo] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geoInfo) {
        setCity(geoInfo.region || "");
        setDistrict(geoInfo.subregion || "");
        const fullAddress = `${geoInfo.name || ""} ${geoInfo.street || ""} ${
          geoInfo.postalCode || ""
        }`;
        setAddress(fullAddress.trim());
      }
    } catch (err) {
      console.log("Adres çözümlenemedi:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <MapView style={styles.map} region={region} onPress={handleMapPress}>
          {currentLocation && (
            <Marker
              coordinate={currentLocation}
              title="Mevcut Konum"
              pinColor="blue"
            />
          )}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Seçilen Konum"
              pinColor="red"
            />
          )}
        </MapView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  map: {
    flex: 1,
  },
});
