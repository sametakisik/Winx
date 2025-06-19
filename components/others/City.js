import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const City = () => {
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni reddedildi.');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(location.coords);

      if (geocode.length > 0) {
        const place = geocode[0];
        setCity(place.region);      // Örnek: "İstanbul"
        setDistrict(place.subregion); // Örnek: "Kadıköy"
      } else {
        setErrorMsg('Konum bilgisi alınamadı.');
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (errorMsg) {
    return <Text style={styles.text}>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>İl: {city}</Text>
      <Text style={styles.text}>İlçe: {district}</Text>
    </View>
  );
};

export default City;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});
