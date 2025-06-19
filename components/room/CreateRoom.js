import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/Colors";
import TeamCard from "../teams/TeamCard";
import FastMatch from "../match/FastMatch";
import { useOverlayBottomSheet } from "../../OverlayContext";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CreateTeamMatch from "../match/CreateTeamMatch";
import { useUser } from "../../context/UserContext";
import TeamListProfile from "../teams/TeamListProfile";
import { Button, Switch, TextInput } from "react-native-paper";
import { createRoom } from "../../utils/RoomApiService";
import { useBottomSheet } from "../../BottomSheetContext";

const CreateRoom = ({ fieldId, reservationTime, maxPlayer }) => {
  const [selectedOption, setSelectedOption] = useState("team");
  const [teams, setTeams] = useState([]);
  const { user ,token } = useUser();

  useEffect(() => {
    if (user?.teams) {
      setTeams(user.teams);
    }
  }, [user]);
  console.log(teams);
  console.log("kapasite", maxPlayer);

  console.log(fieldId, reservationTime);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const { closeSheet } = useBottomSheet();

  const [value, setValue] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleChange = (text) => {
    // Sadece sayılar izin verilir
    const numericValue = text.replace(/[^0-9]/g, "");

    // 25'i geçmesin
    if (numericValue === "" || parseInt(numericValue) <= 25) {
      setValue(numericValue);
    }
  };

  const handleCreateRoom = async () => {
    const x= await createRoom(selectedTeam, {
      fieldId: fieldId,
      slotStart: reservationTime,
      accessType: isSwitchOn ? 1 : 0, // 0 public 1 private
      maxPlayers: value,
    },token);
console.log(x);

    setIsSwitchOn(false)
    setValue("")
    setSelectedTeam(null)
    closeSheet()
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Maç Oluştur</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          label={`Kişi sayısı (max ${maxPlayer})`}
          placeholder={`Kişi sayısını yazın.`}
          value={value}
          onChangeText={handleChange}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.switch}>
          <Text style={styles.label}>Herkese Açık</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text style={styles.label}>Gizli</Text>
        </View>
      </View>

      <Text>Takımlar</Text>
      <TeamListProfile
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <Button
        onPress={handleCreateRoom}
        disabled={!selectedTeam && value % 2 !== 0}
      >
        Oda Oluştur
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: Colors.primary,
  },
  componentContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: 550,
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  input: {
    paddingHorizontal: 10,
    width: "40%",
    marginRight: 20
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Eğer desteklemiyorsa yerine margin kullan
  },
  label: {
    fontSize: 16,
  },
});

export default CreateRoom;
