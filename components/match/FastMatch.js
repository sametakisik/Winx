import { Text, View } from "react-native";
import CreateFastTeam from "../teams/CreateFastTeam";
import { useState } from "react";
import Button from "../UI/Button";
import AddPlayerScreen from "../teams/AddPlayerScreen";
import AddPlayerFast from "../teams/AddPlayerFast";
import FieldBanner from "../field/FieldBanner";
import TeamConfirmScreen from "../teams/TeamConfirmScreen";
import TeamFastConfirmScreen from "../teams/TeamFastConfirmScreen";

const FastMatch = () => {
  const [teamName, setTeamName] = useState("");
  const [screen, setScreen] = useState("screen1");
  return (
    <View>
      {screen === "screen1" && (
        <>
          <CreateFastTeam teamName={teamName} setTeamName={setTeamName} />
          <Button
            onPress={() => {
              setScreen("screen2");
            }}
          >
            İleri
          </Button>
        </>
      )}

      {screen === "screen2" && (
        <View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Button onPress={() => setScreen("screen1")}>Geri</Button>
            <Button onPress={() => setScreen("screen3")}>İleri</Button>
          </View>
          <AddPlayerFast />
        </View>
      )}
      {screen === "screen3" && (
        <View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Button onPress={() => setScreen("screen2")}>Geri</Button>
            <Button onPress={() => setScreen("screen3")}>İleri</Button>
          </View>
          <TeamFastConfirmScreen selectedPlayers={[]} />
        </View>
      )}
      <Text>{teamName}</Text>
    </View>
  );
};

export default FastMatch;
