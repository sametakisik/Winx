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
import SelectFacilityLocation from "../others/SelectFacilityLocation";
import * as Location from "expo-location"; // Eksik import eklendi
import { patchFacility } from "../../utils/FacilityApiService";

const FacilityLocation = ({
  facilityId,
  fetchFacility,
  addressDetails,
  city,
  town,
  phone,
  email,
  latitude,
  longtitude,
}) => {
  const { userType , token} = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [changes, setChanges] = useState({});

  const [locationData, setLocationData] = useState({
    selectedAddress: "", // Haritadan gelen adres
    addressDetails: addressDetails, // Elle girilen ek adres
    town: town,
    city: city,
    phone: phone,
    email: email,
  });
  const [region, setRegion] = useState({
    latitude: latitude || 41.015137,
    longitude: longtitude || 28.97953,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const makePhoneCall = () => {
    const phoneNumber = `tel:${locationData.phone.replace(/[^0-9+]/g, "")}`;
    Linking.openURL(phoneNumber).catch((err) => {
      console.error("Arama başlatılamadı:", err);
    });
  };

const handleInputChange = (field, value) => {
  setLocationData((prev) => ({ ...prev, [field]: value }));
  
  // Track changes only if the new value is different from initial prop
  if (value !== initialProps[field]) {
    setChanges((prev) => ({ ...prev, [field]: value }));
  } else {
    // If value reverts to initial, remove from changes
    setChanges((prev) => {
      const newChanges = { ...prev };
      delete newChanges[field];
      return newChanges;
    });
  }
};
const initialProps = React.useMemo(() => ({
  addressDetails,
  city,
  town,
  phone,
  email,
  latitude,
  longtitude,
}), []);

  // Şehir değişikliği için düzeltilmiş fonksiyon
  const handleCityChange = async (text) => {
    handleInputChange("city", text);
    
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
        setLocationData((prev) => ({ 
          ...prev, 
          town: "", 
          selectedAddress: "" 
        }));
      }
    } catch (error) {
      console.log("Şehir bulunamadı:", error);
    }
  };

const handleSave = async () => {
  
  // Add coordinates to changes if modified
  const finalChanges = { ...changes };
  if (selectedLocation && (
      selectedLocation.latitude !== latitude || 
      selectedLocation.longitude !== longtitude
  )) {
    finalChanges.latitude = selectedLocation.latitude;
    finalChanges.longitude = selectedLocation.longitude;
  }
  
    try {
      const result = await patchFacility(facilityId, changes);
      console.log("Kaydedildi:", result);
      await fetchFacility()
      setIsEditing(false);
      setChanges({});
    } catch (error) {
      console.error("Hata:", error);
      alert("Güncelleme sırasında hata oluştu");
    }

};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="location-sharp" size={24} color="#2196F3" />
          <Text style={styles.title}>Konum Bilgileri</Text>
          
          {userType === "Owner" && (
            <TouchableOpacity
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              style={styles.editButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather
                name={isEditing ? "check" : "edit"}
                size={24}
                color={isEditing ? "#4CAF50" : "#2196F3"}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider} />

        {isEditing ? (
          <>
           
            <InfoItem
              icon="map"
              label="Harita Adresi"
              placeholder="Haritadan konum seçin"
              value={locationData.selectedAddress}
              isEditing={true}
              editable={false}
            />
            
        
            <InfoItem
              icon="home"
              label="Adres Detayı"
              placeholder="Tesisinizin tam adresini yazın"  
              value={locationData.addressDetails}
              isEditing={isEditing}
              onChangeText={(text) => handleInputChange("addressDetails", text)}
            />
          </>
        ) : (
          
          <InfoItem
            icon="map"
            label="Adres"
            value={`${locationData.addressDetails}`}
            isEditing={false}
          />
        )}

        <View style={styles.cityDiscrict}>
          <View style={styles.cityDiscrictItem}>
            <InfoItem
              icon="business"
              label="Şehir"
              placeholder="Şehri yazın"
              value={locationData.city}
              isEditing={isEditing}
              onChangeText={handleCityChange} // Düzeltilmiş fonksiyon
            />
          </View>
          <View style={styles.cityDiscrictItem}>
            <InfoItem
              icon="business"
              label="İlçe"
              value={locationData.town}
              isEditing={isEditing}
              editable={!isEditing} // Düzenleme modunda haritadan gelecek
              onChangeText={(text) => handleInputChange("town", text)}
            />
          </View>

      
        </View>

{isEditing && 
                  <View style={[styles.map, {marginBottom: 13}]}> 
          <SelectFacilityLocation
              setCity={(city) => handleInputChange("city", city)}
              setDistrict={(town) => handleInputChange("town", town)}
              setAddress={(address) => 
                handleInputChange("selectedAddress", address)
              }
              region={region}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </View>}
<View style={styles.rowContainer}>
  <View style={styles.rowItem}>
    <TouchableOpacity onPress={makePhoneCall}>
      <InfoItem
        icon="call"
        label="Telefon"
        placeholder="Telefon numarası girin"
        value={locationData.phone}
        isEditing={isEditing}
        onChangeText={(text) => handleInputChange("phone", text)}
        keyboardType="phone-pad"
      />
    </TouchableOpacity>
  </View>
  
  <View style={styles.rowItem}>
    <InfoItem
      icon="at"
      label="E-posta adresi"
      placeholder="E-posta adresi girin"
      value={locationData.email}
      isEditing={isEditing}
      onChangeText={(text) => handleInputChange("email", text)}
      keyboardType="email-address"
    />
  </View>
</View>
      </View>

{!isEditing &&<View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Harita Konumu</Text>
        <View style={styles.map}>
          {!isEditing ? (
            <Map latitude={latitude} longitude={longtitude} />
          ) : (<View style={{flex:1}}> 
          <Text>{locationData.selectedAddress}</Text>
          <SelectFacilityLocation
              setCity={(city) => handleInputChange("city", city)}
              setDistrict={(town) => handleInputChange("town", town)}
              setAddress={(address) => 
                handleInputChange("selectedAddress", address)
              }
              region={region}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </View>
           
          )}
        </View>
      </View>
}
      
    </ScrollView>
  );
};

// InfoItem bileşeni güncellendi (editable prop eklendi)
const InfoItem = ({
  icon,
  label,
  value,
  isEditing,
  onChangeText,
  keyboardType,
  placeholder,
  editable = true // Varsayılan olarak düzenlenebilir
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
          editable={editable}
          placeholder={placeholder}
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

export default FacilityLocation;
