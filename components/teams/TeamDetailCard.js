import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileScreenOpenSheet from "../profile/ProfileScreenOpenSheet";
import { useBottomSheet } from "../../BottomSheetContext";

const TeamDetailCard = () => {
  
  const {openSheet} = useBottomSheet()

  const teamData = {
    captain: "Ali Duru",
    city: "İstanbul",
    district: "Kadıköy",
    matchesPlayed: 18,
    wins: 12,
    draws: 3,
    losses: 3,
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Takım Detayları</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Kaptan:</Text>
        <TouchableOpacity onPress={()=>openSheet(<ProfileScreenOpenSheet/>)}>
           <Text style={styles.value}>{teamData.captain}</Text>
        </TouchableOpacity>
       
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>İl / İlçe:</Text>
        <Text style={styles.value}>
          {teamData.city} / {teamData.district}
        </Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsHeader}>İstatistikler</Text>

        <View style={styles.statsRow}>
          <Text style={styles.statBox}>Maç: {teamData.matchesPlayed}</Text>
          <Text style={styles.statBox}>Galibiyet: {teamData.wins}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statBox}>Beraberlik: {teamData.draws}</Text>
          <Text style={styles.statBox}>Mağlubiyet: {teamData.losses}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#D80000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  statsSection: {
    marginTop: 15,
  },
  statsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statBox: {
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 14,
    color: "#555",
  },
});

export default TeamDetailCard;
