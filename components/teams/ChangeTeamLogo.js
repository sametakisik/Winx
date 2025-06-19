import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TEAM_LOGO } from "./CreateTeamScreen";

const ChangeTeamLogo = ({ selectedLogo, setSelectedLogo }) => {
  const handleLogoSelect = (logo) => {
    setSelectedLogo(logo);
  };

  return (
    <View style={styles.summary}>
      <Text style={styles.label}>Takım Logonuzu Değiştirin</Text>
      <View style={styles.logoList}>
        {TEAM_LOGO.map((logo) => (
          <TouchableOpacity
            key={logo.id}
            onPress={() => handleLogoSelect(logo)}
          >
            <Image
              source={logo.path}
              style={[
                styles.logo,
                selectedLogo?.id === logo.id && styles.selectedLogo,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Seçilen Takım:</Text>
      {selectedLogo && (
        <Image source={selectedLogo.path} style={styles.previewLogo} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  logoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedLogo: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  summary: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  previewLogo: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  teamNamePreview: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ChangeTeamLogo;
