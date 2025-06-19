import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FieldScreen from '../screens/FieldScreen';
import MyProfileScreen from "../screens/MyProfileScreen";
import NotificationsScreen from "../components/notifications/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FriendRequestsScreen from "../screens/FriendRequestsScreen";
import FriendList from "../components/profile/FriendList";
import { useTheme } from "react-native-paper";

const ProfileStack = () => {

    const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
    return (
    <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.tabbar, // Burada istediğiniz rengi kullanın
                },
            
            }}
        >
              <Stack.Screen name="Profil Bilgilerim" component={MyProfileScreen} />
              <Stack.Screen name="Profil Bilgileri" component={ProfileScreen} />
             
              <Stack.Screen name="Arkadaşlık İstekleri" component={FriendRequestsScreen} />
             
              <Stack.Screen name="Bildirimler" component={NotificationsScreen} />
                
                <Stack.Screen name="Arkadaşlar" component={FriendList} />
        </Stack.Navigator>
    )
}

export default ProfileStack