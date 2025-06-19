import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyProfileScreen from "../screens/MyProfileScreen";
import UserSearchScreen from "../screens/UserSearchScreen";
import RoomsScreen from "../components/room/RoomsScreen";
import TeamList from "../components/teams/TeamList";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant || "gray",
        tabBarStyle: {
          backgroundColor: colors.tabbar,
          borderTopColor: colors.elevation?.level2 || "#ccc",
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: colors.tabbar,
        },
        headerTintColor: colors.onBackground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Futboll"
        component={HomeScreen}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 15, marginRight: 15 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileStack", {
                    screen: "Arkadaşlık İstekleri",
                  })
                }
              >
                <FontAwesome name="user" size={18} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileStack", { screen: "Bildirimler" })
                }
              >
                <FontAwesome name="bell-o" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Odalar"
        component={RoomsScreen}
        options={{
          tabBarLabel: "Odalar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ara"
        component={UserSearchScreen}
        options={{
          tabBarLabel: "Ara",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Takımlar"
        component={TeamList}
        options={{
          tabBarLabel: "Takımlar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={MyProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
