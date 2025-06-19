import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { showLocation } from 'react-native-map-link';

export default function Map({latitude, longitude}) {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Hedef konum bilgisi
  const targetLocation = {
    latitude: 41.015137,
    longitude: 28.979530,
    title: 'İstanbul',
    description: 'Buradasınız',
  };

  // Konum izni al ve kullanıcının konumunu al
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Konum izni reddedildi');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  const handleGetDirections = () => {
    if (!currentLocation) return;

    showLocation({
      latitude: targetLocation.latitude, // Hedef konum
      longitude: targetLocation.longitude,
      sourceLatitude: currentLocation.latitude, // Başlangıç konumu
      sourceLongitude: currentLocation.longitude,
      title: targetLocation.title,
      description: targetLocation.description,
      googleForceLatLon: true, // Google Maps kullan
      alwaysIncludeGoogle: true, // Android'de Google Maps
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.015137, // Başlangıç (harita yükleme)
          longitude: 28.979530,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Başlangıç Konumu" />
        )}

        <Marker
          coordinate={targetLocation}
          title={targetLocation.title}
          description={targetLocation.description}
        />
      </MapView>
      <Button title="Yol Tarifi Al" onPress={handleGetDirections} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
