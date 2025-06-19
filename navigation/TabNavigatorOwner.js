import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PitchFilterScreen from "../components/field/FieldFilter";
import { Ionicons } from "@expo/vector-icons";
import MyTeamScreen from "../components/teams/MyTeamScreen";
import RecentMatchCard from "../components/match/RecentMatchCard";
import MatchDetail from "../components/match/MatchDetail";
import MatchScreen from "../screens/MatchScreen";
import TeamList from "../components/teams/TeamList";
import MyTeam from "../components/teams/MyTeam";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import HomeScreenOwner from "../screens/HomeScreenOwner";
import FacilityScreen from "../components/fieldAdmin/FacilityScreen";
import ProfileScreenOwner from "../screens/ProfileScreenOwner";

const teams = [1,2,3]
const TabsOwner = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Futboll admin"
        component={HomeScreenOwner}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

       <Tab.Screen
        name="Profil"
        component={ProfileScreenOwner}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      
    </Tab.Navigator>
  );
};

export default TabsOwner;
