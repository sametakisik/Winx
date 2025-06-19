import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFacilityByOwnerId } from "../utils/FacilityApiService";
import { BASE_URL_PHOTOS } from "../utils/FieldApiService";
import { Colors } from "../constants/Colors";





const SelectFacility = () => {
  // const {userId} = useUser()
  const userId = 1;

  const navigation = useNavigation()

  const [facilities, setFacilities] = useState([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState();

  useEffect(() => {
    const fetchFacilities = async () => {
      const facilities = await getFacilityByOwnerId(userId);
      setFacilities(facilities);
    };
    fetchFacilities();
  }, []);
 
console.log(facilities);

  
  const handleContinue = () => {
    if (selectedFacilityId) {
      navigation.navigate("Yeni Saha Oluştur", { facilityId: selectedFacilityId });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => setSelectedFacilityId(item.id)}
      style={[
        styles.facilityItem,
        selectedFacilityId === item.id && styles.selectedFacilityItem
      ]}
    >
      <Image 
        source={{ uri: BASE_URL_PHOTOS + item.logoUrl }} 
        style={styles.facilityImage}
      />
      
      <View style={styles.facilityInfo}>
        <View style={styles.facilityHeader}>
          <Text style={styles.facilityName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.locationText}>
          <Icon name="location-on" size={14} color="#666" />
          {item.city} / {item.town}
        </Text>
        
        <Text style={styles.descriptionText}>{item.fields.length} saha</Text>
      </View>
      

    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tesisleriniz</Text>
        <Text style={styles.subtitle}>Ekleyeceğiniz sahanın bağlı olacağı tesisi seçin</Text>
      </View>

      <FlatList
        data={facilities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="sports-soccer" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Henüz kayıtlı tesisiniz bulunmamaktadır</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleContinue}
          disabled={!selectedFacilityId}
          style={[styles.button, !selectedFacilityId && styles.disabledButton]}
          labelStyle={styles.buttonLabel}
        >
          İleri
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#3498db',
  },
  listContainer: {
    paddingBottom: 20,
  },
  facilityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedFacilityItem: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: '#edfff1',
  },
  facilityImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: '#e0e0e0', // Placeholder background
  },
  facilityInfo: {
    flex: 1,
  },
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#689f38',
    fontWeight: 'bold',
  },
  locationText: {
    color: '#666',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 10,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#95a5a6',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SelectFacility;