import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTeam from "./MyTeam";
import TeamPlayers from "./TeamPlayers";
import { Text, TouchableOpacity } from "react-native";
import TeamDetailCard from "./TeamDetailCard";
import Button from "../UI/Button";
import React, { useEffect, useState } from "react";
import IconButton from "../UI/IconButton";
import CommentScreen from "../others/CommentScreen";
import CustomTabBar from "../others/CustomTabBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTeamById, getTeamMembersById } from "../../utils/TeamApiService";
import { useUser } from "../../context/UserContext";
import TeamJoinRequests from "./TeamJoinRequests";

const MyTeamScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  const { user, token } = useUser();
  const route = useRoute();
  const { teamId } = route.params;

  const navigation = useNavigation();

  const [team, setTeam] = useState({});

  const [memberCount, setMemberCount] = useState("");
  const [members, setMembers] = useState([]);

  const [admins, setAdmins] = useState([]);
  const [isMyAdmin, setIsMyAdmin] = useState(false);

  const fetchMembers = async () => {
    const member = await getTeamMembersById(teamId);
    setMembers(member);
    setMemberCount(member?.length);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeamById(teamId, token);
      setTeam(team);
      const adminMembers = team.members.filter((member) => member.isAdmin);
      setMembers(team.members);
      setMemberCount(team?.members?.length);
      setAdmins(adminMembers);
      setIsMyAdmin(adminMembers.some((admin) => admin.userId === user.id));
    };
    fetchTeam();
  }, []);
  console.error(isMyAdmin);
  React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () =>
      ["CaptainAndAdmin", "Admin"].includes(team.userStatus) ? (
        <IconButton
          icon="ellipsis-vertical"
          size={20}
          onPress={() =>
            navigation.navigate("TeamStack", {
              screen: "Takımınızı Düzenleyin",
              params: { teamId },
            })
          }
        />
      ) : null,
  });
}, [navigation, team.userStatus, teamId]);


  const [visible, setVisible] = React.useState(true);
  return (
    <>
      {visible && (
        <MyTeam
          teamId={teamId}
          name={team.name}
          city={team.city}
          logoUrl={team.logoUrl}
          town={team.town}
          playerCount={memberCount}
          avgRating={team.avgRating}
          userStatus={team.userStatus}
        />
      )}
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Takımım" component={TeamDetailCard} />
        <Tab.Screen
          name="Oyuncular"
          component={() => (
            <TeamPlayers
              teamId={teamId}
              teamName={team.name}
              members={members}
              setMembers={setMembers}
              isMyAdmin={isMyAdmin}
              visible={visible}
              setVisible={setVisible}
              setMemberCount={setMemberCount}
              fetchMembers={fetchMembers}
            />
          )}
        />
        {["CaptainAndAdmin", "Admin"].includes(team.userStatus) && (
          <Tab.Screen
            name="Katılma İstekleri"
            component={() => (
              <TeamJoinRequests
                teamId={teamId}
                fetchMembers={fetchMembers}
                setMemberCount={setMemberCount}
              />
            )}
          />
        )}

        <Tab.Screen
          name="Yorumlar"
          component={() => <CommentScreen id={teamId} commentType="Team" />}
        />
      </Tab.Navigator>
    </>
  );
};

export default MyTeamScreen;
