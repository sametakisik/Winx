import { StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";

import Button from "../UI/Button";
import ProfileDetails from "./ProfileDetails";
import ProfileComment from "./ProfileComment";
import ProfileCard from "./ProfileCard";
import { getUserInfos } from "../../utils/FriendshipApiService";
import ProfileCardOpensheet from "./ProfileCardOpensheet";
import { useUser } from "../../context/UserContext";
import { useBottomSheet } from "../../BottomSheetContext";

const ProfileScreenOpenSheet = ({ navigation, userId }) => {
  const [user, setUser] = useState({});
  const { token } = useUser();

  const {closeSheet} = useBottomSheet()
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfos(userId, token);
      setUser(user);
    };
    fetchUser();
  }, []);
  console.log(user);

  return (
    <View style={{ paddingHorizontal: 8 }}>
      <View>
        <ProfileCardOpensheet
          userName={user.userName}
          firstName={user.firstName}
          lastName={user.lastName}
          photoUrl={user.photoUrl}
          avgRating= {user.avgRating}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button>Takip et</Button>
        <Button
          onPress={() =>
          {  navigation.navigate("ProfileStack", {
              screen: "Profil Bilgileri",
              params: { userId: userId },
            })
          closeSheet()
          }
          }
        >
          Profile Git
        </Button>
      </View>
      <ProfileDetails
        city={user.city}
        playingPosition={user.playingPosition}
        weight={user.weight}
        height={user.height}
        birthday={user.birthday}
        footPreference={user.footPreference}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});

export default ProfileScreenOpenSheet;
