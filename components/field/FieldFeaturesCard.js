import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { patchFacility } from "../../utils/FacilityApiService";

const FieldFeaturesCard = ({
  facilityId,
  fetchFacility,
  hasCafeteria,
  hasToilet,
  hasShower,
  hasTransportService,
  hasLockerRoom,
  hasFirstAid,
  hasSecurityCameras,
  hasShoeRental,
  hasGlove,
  hasLockableCabinet,
  hasParking,
  hasRefereeService,
}) => {
  const { userType , token} = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [features, setFeatures] = useState([
    { id: 1, text: "Kafeterya", available: hasCafeteria },
    { id: 2, text: "Duş", available: hasShower },
    { id: 3, text: "Servis Hizmeti", available: hasTransportService },
    { id: 4, text: "Tuvalet", available: hasToilet },
    { id: 5, text: "Otopark", available: hasParking },
    {
      id: 6,
      text: "Ayakkabı Kiralama",
      available: hasShoeRental,
      isEditable: false,
    },
    { id: 7, text: "Eldiven Kiralama", available: hasGlove, isEditable: false },
    { id: 8, text: "Soyunma Odası", available: hasLockerRoom },
    { id: 9, text: "Kilitlenebilir Dolap", available: hasLockableCabinet },
    { id: 10, text: "Güvenlik Kameraları", available: hasSecurityCameras },
    { id: 11, text: "Hakem Hizmeti", available: hasRefereeService },
    { id: 12, text: "İlk Yardım Müdahalesi", available: hasFirstAid },
  ]);

  const originalFeatureStates = {
    hasCafeteria,
    hasShower,
    hasTransportService,
    hasToilet,
    hasParking,
    hasShoeRental,
    hasGlove,
    hasLockerRoom,
    hasLockableCabinet,
    hasSecurityCameras,
    hasRefereeService,
    hasFirstAid,
  };

  const getFeatureKeyById = (id) => {
    const idToKeyMap = {
      1: "hasCafeteria",
      2: "hasShower",
      3: "hasTransportService",
      4: "hasToilet",
      5: "hasParking",
      6: "hasShoeRental",
      7: "hasGlove",
      8: "hasLockerRoom",
      9: "hasLockableCabinet",
      10: "hasSecurityCameras",
      11: "hasRefereeService",
      12: "hasFirstAid",
    };
    return idToKeyMap[id];
  };

  const [editingItems, setEditingItems] = useState({});
  console.log(editingItems);

const toggleAvailability = (id) => {
  const updatedFeatures = features.map((f) => {
    if (f.id === id && (f.isEditable === undefined || f.isEditable)) {
      const newAvailability = !f.available;
      const featureKey = getFeatureKeyById(id);

      setEditingItems((prev) => {
        const originalValue = originalFeatureStates[featureKey];
        if (originalValue === newAvailability) {
          const updated = { ...prev };
          delete updated[featureKey];
          return updated;
        } else {
          return { ...prev, [featureKey]: newAvailability };
        }
      });

      return { ...f, available: newAvailability };
    }
    return f;
  });

  setFeatures(updatedFeatures);
};

const handleSave = async () => {

  try {
    const result = await patchFacility(facilityId, editingItems, token);
    console.log("Kaydedildi:", result);
      await fetchFacility()
    setIsEditing(false);
    setEditingItems({});
  } catch (error) {
    console.error("Hata:", error);
    alert("Güncelleme sırasında hata oluştu");
  }
};

  const handleCancelEditing = () => {
    // Orijinal değerlerden tekrar features'ı oluştur
    const restoredFeatures = features.map((f) => {
      const key = getFeatureKeyById(f.id);
      const originalValue = originalFeatureStates[key];
      return {
        ...f,
        available: originalValue,
      };
    });

    setFeatures(restoredFeatures);
    setEditingItems({});
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tesis Özellikleri</Text>
        {userType === "Owner" && (
          <View style={{ flexDirection: "row", gap: 12 }}>
            {isEditing && (
            <TouchableOpacity
  onPress={handleCancelEditing}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Feather name="x" size={24} color="#F44336" />
</TouchableOpacity>
            )}
<TouchableOpacity
  onPress={isEditing ? handleSave : () => setIsEditing(true)}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Feather
    name={isEditing ? "check" : "edit"}
    size={24}
    color={isEditing ? "#4CAF50" : "#2196F3"}
  />
</TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.featuresGrid}
        showsVerticalScrollIndicator={false}
      >
        {features.map((feature) => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            isEditing={isEditing}
            onToggle={toggleAvailability}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const FeatureItem = ({ feature, isEditing, onToggle, onTextChange }) => {
  const isFeatureEditable =
    feature.isEditable === undefined || feature.isEditable;

  const textStyle = [
    styles.featureText,
    !feature.available && styles.unavailableText,
    !feature.available && !isEditing && { textDecorationLine: "line-through" },
    !isFeatureEditable && isEditing && styles.nonEditableText, // Sadece düzenleme modunda gri yap
  ];

  return (
    <View style={styles.featureItem}>
      <TouchableOpacity
        onPress={() => isFeatureEditable && onToggle(feature.id)}
        disabled={!isEditing} // Sadece düzenleme modunda disable et
      >
        <Ionicons
          name={feature.available ? "checkmark-circle" : "close-circle"}
          size={20}
          color={
            !isFeatureEditable && isEditing
              ? "#9E9E9E"
              : feature.available
              ? "#4CAF50"
              : "#F44336"
          }
        />
      </TouchableOpacity>

      <Text style={textStyle}>{feature.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 15,
    color: "#424242",
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
  editableText: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    paddingVertical: 2,
  },
  unavailableText: {
    color: "#999",
  },
  nonEditableText: {
    color: "#9E9E9E",
  },
});

export default FieldFeaturesCard;
