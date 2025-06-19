import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const EquipmentManager = () => {
  const [equipments, setEquipments] = useState([]);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [isRentable, setIsRentable] = useState(false);

  const addEquipment = () => {
    if (type && brand && price) {
      const newItem = {
        id: Date.now().toString(),
        type,
        brand,
        price,
        isRentable,
      };
      setEquipments((prev) => [...prev, newItem]);
      setType("");
      setBrand("");
      setPrice("");
      setIsRentable(false);
    } else {
      alert("Lütfen tüm alanları doldurun");
    }
  };

  const removeEquipment = (id) => {
    setEquipments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Ekipman Yönetimi</Text>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Yeni Ekipman Ekle</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Tür (örn: Top, Yelek)"
            value={type}
            onChangeText={setType}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Marka"
            value={brand}
            onChangeText={setBrand}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Fiyat (₺)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Kiralık mı?</Text>
            <Switch
              value={isRentable}
              onValueChange={setIsRentable}
              thumbColor={isRentable ? "#4CAF50" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81c784" }}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addEquipment}>
            <Text style={styles.buttonText}>Ekipman Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Ekipman Listesi</Text>
          
          {equipments.length === 0 ? (
            <Text style={styles.emptyText}>Henüz ekipman eklenmedi</Text>
          ) : (
            <FlatList
              data={equipments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[
                  styles.equipmentItem,
                  item.isRentable && styles.rentableItem
                ]}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.itemPrice}>₺{item.price}</Text>
                      <View style={[
                        styles.rentableBadge,
                        item.isRentable ? styles.rentable : styles.notRentable
                      ]}>
                        <Text style={styles.rentableText}>
                          {item.isRentable ? "Kiralık" : "Satılık"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeEquipment(item.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EquipmentManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#2c3e50",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    color: "#2c3e50",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: "#495057",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  equipmentItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rentableItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  itemInfo: {
    flex: 1,
  },
  itemType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e74c3c",
    marginRight: 10,
  },
  rentableBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rentable: {
    backgroundColor: "#e8f5e9",
  },
  notRentable: {
    backgroundColor: "#f5f5f5",
  },
  rentableText: {
    fontSize: 12,
    color: "#388e3c",
    fontWeight: "500",
  },
  removeBtn: {
    backgroundColor: "#f8f9fa",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  removeText: {
    color: "#e74c3c",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#adb5bd",
    marginTop: 20,
    fontSize: 16,
  },
});