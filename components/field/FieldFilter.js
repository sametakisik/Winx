import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const FeatureFilter = ({ text, available, selected, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.featureButton,
        selected ? styles.selectedFeature : styles.unselectedFeature,
        !available && styles.disabledFeature
      ]}
      onPress={() => available && onToggle()}
      disabled={!available}
    >
      <Text style={[
        styles.featureText,
        selected && styles.selectedText,
        !available && styles.disabledText
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const PitchFilterScreen = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredPitches, setFilteredPitches] = useState([]);

  const features = [
    { id: 1, text: "Açık saha", available: true },
    { id: 2, text: "Kafeterya", available: true },
    { id: 3, text: "Duş", available: false },
    { id: 4, text: "Servis", available: true },
    { id: 5, text: "Otopark", available: true },
    { id: 6, text: "Ayakkabı kiralama", available: false },
    { id: 7, text: "Kamera", available: true }
  ];

  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const applyFilters = () => {
    // Burada filtreleme mantığını uygulayın
    // Örnek: API'den filtrelenmiş sahaları çekme veya yerel veriyi filtreleme
    console.log("Uygulanan Filtreler:", selectedFeatures);
    
    // Filtrelenmiş sahaları güncelle
    // setFilteredPitches(filteredData);
  };

  const resetFilters = () => {
    setSelectedFeatures([]);
    setFilteredPitches([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtreleme Seçenekleri</Text>
      
      <ScrollView contentContainerStyle={styles.featuresContainer}>
        {features.map(feature => (
          <FeatureFilter
            key={feature.id}
            text={feature.text}
            available={feature.available}
            selected={selectedFeatures.includes(feature.id)}
            onToggle={() => toggleFeature(feature.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.buttonText}>Sıfırla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.buttonText}>Uygula</Text>
        </TouchableOpacity>
      </View>

      {/* Filtrelenmiş sahaların listesi */}
      <ScrollView style={styles.resultsContainer}>
        {filteredPitches.length > 0 ? (
          filteredPitches.map(pitch => (
            <View key={pitch.id} style={styles.pitchItem}>
              <Text>{pitch.name}</Text>
              {/* Diğer saha bilgileri */}
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>Filtreleme yapın veya sonuç bulunamadı</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFeature: {
    backgroundColor: '#2ecc71',
  },
  unselectedFeature: {
    backgroundColor: '#ecf0f1',
  },
  disabledFeature: {
    backgroundColor: '#bdc3c7',
  },
  featureText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#7f8c8d',
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
  },
  pitchItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  },
});

export default PitchFilterScreen;