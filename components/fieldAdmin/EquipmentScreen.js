import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomSheet } from "../../BottomSheetContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import EquipmentAdd from "./EquipmentAdd";
import {
  deleteEquipment,
  getEquipmentById,
} from "../../utils/EquipmentsApiService";
import { Button, Dialog, Portal } from "react-native-paper";

const EquipmentScreen = ({
  equipmentsLocale,
  screenType,
  setNewEquipment,
  facilityId,
}) => {
  const { openSheet } = useBottomSheet();

  const [equipments, setEquipments] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipment = await getEquipmentById(facilityId);
      setEquipments(equipment);
    };
    fetchEquipments();
  }, [facilityId]);

  const fetchEquipments = async () => {
    const equipment = await getEquipmentById(facilityId);
    setEquipments(equipment);
  };

  const removeEquipment = async (id) => {
    //  setEquipments((prev) => prev.filter((item) => item.id !== id));
    await deleteEquipment(facilityId, id);
    await fetchEquipments();
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 30) / 2 - 10;
  const renderItem = ({ item }) => (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.rentableBadge,
              item.isRentable ? styles.rentable : styles.notRentable,
            ]}
          >
            <Text style={styles.rentableText}>
              {item.isRentable ? "Kiralık" : "Kiralık Değil"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              setSelectedEquipmentId(item.id);
              setVisible(true);
            }}
          >
            <MaterialIcons name="close" size={18} color="#bdbdbd" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>₺{item.price} / saat</Text>
          <Text style={styles.cardQuantity}>{item.quantity} adet</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tesis Ekipman Listesi</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() =>
            openSheet(
              React.createElement(EquipmentAdd, {
                fetchEquipments,
                setNewEquipment,
                screenType,
                facilityId,
              }),
              ["70%", "90%"]
            )
          }
        >
          <Text style={styles.newButtonText}>Yeni Ekipman</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {(screenType === "facilityPage"
          ? equipments
          : screenType === "createFacilityPage"
          ? equipmentsLocale
          : []
        )?.length === 0 ? (
          <Text style={styles.emptyText}>Henüz ekipman eklenmedi</Text>
        ) : (
          <FlatList
            data={
              screenType === "facilityPage"
                ? equipments
                : screenType === "createFacilityPage"
                ? equipmentsLocale
                : []
            }
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Ekipmanı Silin</Dialog.Title>
          <Dialog.Content>
            <Text>Bu ekipmanı silmek istiyor musunuz?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>İptal</Button>
            <Button
              onPress={() => {
                removeEquipment(selectedEquipmentId);
                setVisible(false);
              }}
            >
              Sil
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  newButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 120,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rentableBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rentable: {
    backgroundColor: "#e8f5e9",
  },
  notRentable: {
    backgroundColor: "#ffebee",
  },
  rentableText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#388e3c",
  },
  removeButton: {
    padding: 2,
  },
  cardBody: {
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e74c3c",
  },
  cardQuantity: {
    fontSize: 13,
    color: "#95a5a6",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#adb5bd",
    marginTop: 20,
    fontSize: 16,
  },
});

export default EquipmentScreen;
