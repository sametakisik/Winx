import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Map from "../others/Map";
import { useUser } from "../../context/UserContext";

const FieldLocation = () => {
  const { userType } = useUser()
  const [isEditing, setIsEditing] = useState(false);
  const [locationData, setLocationData] = useState({
    address: "Çamlıca Caddesi No:12, Papatya Sokak, Yeşilyurt Mahallesi",
    district: "Kadıköy",
    city: "İstanbul",
    phone: "+90 532 123 45 67",
  });

  const makePhoneCall = () => {
    const phoneNumber = `tel:${locationData.phone.replace(/[^0-9+]/g, "")}`;
    Linking.openURL(phoneNumber).catch((err) => {
      console.error("Arama başlatılamadı:", err);
    });
  };

  const handleInputChange = (field, value) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Burada verileri kaydetme işlemi yapılabilir
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="location-sharp" size={24} color="#2196F3" />
          <Text style={styles.title}>Konum Bilgileri</Text>
          {userType === "admin" &&           <TouchableOpacity
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            style={styles.editButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name={isEditing ? "check" : "edit"}
              size={24}
              color={isEditing ? "#4CAF50" : "#2196F3"}
            />
          </TouchableOpacity>}
        </View>

        <View style={styles.divider} />

        <InfoItem
          icon="map"
          label="Adres"
          value={locationData.address}
          isEditing={isEditing}
          onChangeText={(text) => handleInputChange("address", text)}
        />

        <View style={styles.cityDiscrict}>
          <View style={styles.cityDiscrictItem}>
            <InfoItem
              icon="business"
              label="İlçe"
              value={locationData.district}
              isEditing={isEditing}
              onChangeText={(text) => handleInputChange("district", text)}
            />
          </View>
          <View style={styles.cityDiscrictItem}>
            <InfoItem
              icon="city"
              label="İl"
              value={locationData.city}
              isEditing={isEditing}
              onChangeText={(text) => handleInputChange("city", text)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={makePhoneCall}>
          <InfoItem
            icon="call"
            label="Telefon"
            value={locationData.phone}
            isEditing={isEditing}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Harita Konumu</Text>
        <View style={styles.map}>
          <Map />
        </View>
        {isEditing && (
          <TouchableOpacity style={styles.mapEditButton}>
            <Text style={styles.mapEditButtonText}>
              Haritada Konumu Düzenle
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
  isEditing,
  onChangeText,
  keyboardType,
}) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={18} color="#757575" style={styles.icon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.infoInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={`${label} girin`}
        />
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  editButton: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginBottom: 12,
  },
  cityDiscrict: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cityDiscrictItem: {
    flex: 1,
    minWidth: 0,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#424242",
    fontWeight: "600",
    lineHeight: 22,
  },
  infoInput: {
    fontSize: 15,
    color: "#424242",
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingVertical: 4,
    marginBottom: 2,
  },
  mapContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    paddingLeft: 8,
  },
  map: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  mapEditButton: {
    marginTop: 10,
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  mapEditButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default FieldLocation;
