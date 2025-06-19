import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import ProfileScreenOpenSheet from "../profile/ProfileScreenOpenSheet";
import { useBottomSheet } from "../../BottomSheetContext";
import { Banner, Button, Divider, FAB, Menu } from "react-native-paper"; // Added Menu import
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";
import {
  getTeamMembersById,
  removeMemberTeam,
} from "../../utils/TeamApiService";
import { useState } from "react";

const TeamPlayers = ({
  teamId,
  teamName,
  isMyAdmin,
  members,
  setMembers,
  setMemberCount,
  visible,
  setVisible,
  fetchMembers
}) => {
  const { openSheet } = useBottomSheet();
  const navigation = useNavigation();


  // State for menu visibility and selected player
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);

 

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - prevScrollY.current;

    if (diff > 10 && visible) {
      setVisible(false);
    } else if (diff < -10 && !visible) {
      setVisible(true);
    }

    prevScrollY.current = currentOffset;
  };

  const prevScrollY = React.useRef(0);



  // Open menu and set selected player
  const openMenu = (player) => {
    setSelectedPlayer(player);
    setMenuVisible(true);
  };

  // Close menu
  const closeMenu = () => setMenuVisible(false);

  // Handle menu actions
  const handleMakeCaptain = () => {
    closeMenu();
    console.log("Make captain:", selectedPlayer.id);
    // Implement make captain logic here
  };

  const handleRemovePlayer = async () => {
    try {
      await removeMemberTeam(teamId, selectedPlayer.userId);
      await fetchMembers();
      closeMenu();
      console.log("başarılı kaldırma");
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.playerContainer}>
      <TouchableOpacity
        style={styles.playerContent}
        onPress={() =>
          openSheet(
            <ProfileScreenOpenSheet
              navigation={navigation}
              userId={item.userId}
            />,
            ["50%"]
          )
        }
        activeOpacity={0.8}
      >
        <View style={styles.playerMainContent}>
          <Image
            source={
              item.photoUrl
                ? { uri: BASE_URL_PHOTOS + item.photoUrl }
                : require("../../assets/avatar.jpg")
            }
            style={styles.image}
          />

          <View style={styles.playerInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {item.firstName} {item.lastName}
              </Text>
              {item.isCaptain && (
                <MaterialIcons
                  name="star"
                  size={20}
                  color="#FFD700"
                  style={styles.captainIcon}
                />
              )}
            </View>
            <Text style={styles.playerUserName} numberOfLines={1}>
              @{item.userName}
            </Text>

            <View style={styles.positionRatingContainer}>
              <View
                style={[
                  styles.positionContainer,
                  item.position === "Kaleci" && styles.goalkeeper,
                ]}
              >
                <Text style={styles.playerPosition}>{item.position}</Text>
              </View>

              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.ratingText}>{item.avgRating}</Text>
              </View>
            </View>
          </View>
        </View>

        {isMyAdmin && (
          <Menu
            visible={menuVisible && selectedPlayer?.id === item.id}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={() => openMenu(item)}>
                <Feather name="more-vertical" size={20} color="#64748B" />
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}
          >
            <Menu.Item
              onPress={handleMakeCaptain}
              title="Kaptanlık Ver"
              titleStyle={styles.menuItemText}
            />
            <Menu.Item
              onPress={handleMakeCaptain}
              title="Yönetici Yap"
              titleStyle={styles.menuItemText}
            />
            <Divider />
            <Menu.Item
              onPress={handleRemovePlayer}
              title="Takımdan Çıkar"
              titleStyle={[styles.menuItemText, styles.removeText]}
            />
          </Menu>
        )}
      </TouchableOpacity>

      {item.isAdmin && (
        <View style={styles.adminBadge}>
          <Text style={styles.adminText}>Yönetici</Text>
        </View>
      )}
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />

      {isMyAdmin && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            navigation.navigate("Oyuncu Ekleyin", {
              teamId: teamId,
              teamName: teamName,
              screenType: "TeamScreen"
            });
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  playerContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  playerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  playerMainContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    marginTop: 2,
  },
  playerInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    maxWidth: "80%",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  captainIcon: {
    marginLeft: 6,
  },
  playerUserName: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  positionRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  positionContainer: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  playerPosition: {
    fontSize: 12,
    fontWeight: "500",
    color: "#166534",
    textTransform: "capitalize",
  },
  goalkeeper: {
    backgroundColor: "#FECDD3",
  },
  goalkeeperText: {
    color: "#9F1239",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF9C3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B45309",
    marginLeft: 4,
  },

  adminBadge: {
    backgroundColor: "#E0F2FE",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 16,
    alignSelf: "flex-end",
  },
  adminText: {
    color: "#0369A1",
    fontSize: 12,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
  },
  menuContent: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  removeText: {
    color: "#EF4444",
  },
});

export default TeamPlayers;
