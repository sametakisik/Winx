import { useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Button from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const TEAM_LOGO = [
  { id: 1, path: require("../../assets/team-logo/1.png") },
  { id: 2, path: require("../../assets/team-logo/2.png") },
  { id: 3, path: require("../../assets/team-logo/3.png") },
  { id: 4, path: require("../../assets/team-logo/4.png") },
  { id: 5, path: require("../../assets/team-logo/5.png") },
  { id: 6, path: require("../../assets/team-logo/6.png") },
  { id: 7, path: require("../../assets/team-logo/7.png") },
  { id: 4, path: require("../../assets/team-logo/4.png") },
  { id: 5, path: require("../../assets/team-logo/5.png") },
  { id: 6, path: require("../../assets/team-logo/6.png") },
  { id: 7, path: require("../../assets/team-logo/7.png") },
];

const CreateTeam = ({teamName, setTeamName}) => {

  const [selectedLogo, setSelectedLogo] = useState(null);

  return (
    <View
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Yeni Takım Oluştur</Text>

      {/* Takım Adı Bölümü */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Takım Adı</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="people"
            size={20}
            color={Colors.gray}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Takımınıza bir ad verin"
            placeholderTextColor={Colors.gray}
            value={teamName}
            onChangeText={setTeamName}
          />
        </View>
      </View>

      {/* Logo Seçim Bölümü */}
      <View style={styles.section}>
        <Text style={styles.label}>Takım Logosu Seçin</Text>
        <Text style={styles.subLabel}>Mevcut logolardan birini seçin</Text>

        <View style={styles.logoList}>
          {TEAM_LOGO.map((logo) => (
            <TouchableOpacity
              key={logo.id}
              onPress={() => setSelectedLogo(logo.path)}
              style={styles.logoContainer}
            >
              <Image
                source={logo.path}
                style={[
                  styles.logo,
                  selectedLogo === logo.path && styles.selectedLogo,
                ]}
              />
              {selectedLogo === logo.path && (
                <View style={styles.selectedBadge}>
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.dark,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 15,
  },
  logoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    maxHeight: 200
  },
  logoContainer: {
    position: "relative",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedLogo: {
    borderColor: Colors.primary,
  },
  selectedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateTeam;
