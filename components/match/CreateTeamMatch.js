import { Text, View } from "react-native";
import CreateFastTeam from "../teams/CreateFastTeam";
import { useState } from "react";
import Button from "../UI/Button";
import AddPlayerScreen from "../teams/AddPlayerScreen";
import AddPlayerFast from "../teams/AddPlayerFast";
import FieldBanner from "../field/FieldBanner";
import TeamConfirmScreen from "../teams/TeamConfirmScreen";
import TeamFastConfirmScreen from "../teams/TeamFastConfirmScreen";
import TeamMatch from "./TeamMatch";
import PickOpposingTeam from "./PickOpposingTeam";
import TeamList from "../teams/TeamList";

const CreateTeamMatch = () => {
  const [screen, setScreen] = useState("screen1");
  return (
    <View>
      {screen === "screen1" && (
        <>
          <TeamMatch />
          <Button
            onPress={() => {
              setScreen("screen2");
            }}
          >
            İleri
          </Button>
        </>
      )}
      {screen === "screen2" && <>
     

      <PickOpposingTeam/>
      </>}
    </View>
  );
};

export default CreateTeamMatch;
