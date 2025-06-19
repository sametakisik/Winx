import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchAnnouncements from "../screens/MatchAnnouncementsScreen";
import FindPlayerScreen from "../FindPlayerScreen";
import CreateTeamScreen from "../components/teams/CreateTeamScreen";
import AddPlayerScreen from "../components/teams/AddPlayerScreen";
import { useNavigation } from "@react-navigation/native";
import MyTeamScreen from "../components/teams/MyTeamScreen";
import Button from "../components/UI/Button";
import TeamConfirmScreen from "../components/teams/TeamConfirmScreen";
import TeamList from "../components/teams/TeamList";
import TeamScreen from "../components/teams/TeamScreen";
import EditTeam from "../components/teams/EditTeam";
import TeamListProfile from "../components/teams/TeamListProfile";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator(); // Stack Navigator'ı burada oluşturuyoruz

const HeaderRightButton = ({ teamName }) => {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate("Oyuncu Ekleyin", { teamName })}>
      İleri
    </Button>
  );
};

const TeamStack = () => {
    const { colors } = useTheme();
  return (
  <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.tabbar, // Burada istediğiniz rengi kullanın
                },
            
            }}
        >
      <Stack.Screen name="Takım oluşturun" component={CreateTeamScreen} />

      <Stack.Screen name="Oyuncu Ekleyin" component={AddPlayerScreen} />
      <Stack.Screen name="Takımınızı Onaylayın" component={TeamConfirmScreen} />
      <Stack.Screen name="Takımım" component={MyTeamScreen} />
      <Stack.Screen name="Takım Listesi" component={TeamList} />
      <Stack.Screen name="Üyesi Olduğum Takımlar" component={TeamListProfile} />

      <Stack.Screen name="Takım Detayları" component={MyTeamScreen} />
      <Stack.Screen name="Takımınızı Düzenleyin" component={EditTeam} />

    </Stack.Navigator>
  );
};

export default TeamStack;
