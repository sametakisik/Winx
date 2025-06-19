import {
  Image,
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";

const FacilityBanner = ({ name, rating = 4.2 }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundImage = require("../../assets/saha.jpg");
  const logoImage = require("../../assets/team-logo/1.png");

  return (
    <>
      <Pressable 
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        {/* Full background image */}
        <Image 
          source={backgroundImage} 
          style={styles.backgroundImage} 
          blurRadius={1}
        />
        
        {/* Dark overlay for better text visibility */}
        <View style={styles.darkOverlay} />
        
        {/* Logo on the right side */}
        <View style={styles.logoContainer}>
          <Image 
            source={logoImage} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>

        {/* Text content */}
        <View style={styles.textOverlay}>
          <Text style={styles.title} numberOfLines={1}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </Pressable>

      {/* Image Gallery Modal */}
      <Modal 
        visible={modalVisible} 
        transparent={true} 
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="white" />
          </Pressable>
          
          <Image
            source={backgroundImage}
            style={styles.fullImage}
            resizeMode="cover"
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    position: 'relative',
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  logoContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoImage: {
    width: 300,
    height: 300,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 120, // Leave space for logo
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
});

export default FacilityBanner;