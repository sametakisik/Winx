import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FieldScreen from '../screens/FieldScreen';
import FacilityScreen from "../components/fieldAdmin/FacilityScreen";
import FieldEdit from "../components/fieldAdmin/FieldEdit";
import CreateField from "../components/fieldAdmin/CreateField";
import CreateField2 from "../components/fieldAdmin/CreateField2";
import CreateFacility from "../components/fieldAdmin/CreateFacility";
import CreateFacility2 from "../components/fieldAdmin/CreateFacility2";
import CreateFacility3 from "../components/fieldAdmin/CreateFacility3";
import CreateFacility4 from "../components/fieldAdmin/CreateFacility4";
import CreateFacility5 from "../components/fieldAdmin/CreateFacility5";
import SelectFacility from "../screens/SelectFacility";
import { useTheme } from "react-native-paper";

const FieldStack = () => {

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
              <Stack.Screen name="Tesis Detayları" component={FacilityScreen} />
              <Stack.Screen name="Saha Detayları" component={FieldScreen} />
              <Stack.Screen name="Tesis Seçin" component={SelectFacility} />
              <Stack.Screen name="Yeni Saha Oluştur" component={CreateField} />
              <Stack.Screen name="Saha Detaylarını Tamamla" component={CreateField2} />

              <Stack.Screen name="Yeni Tesis Oluştur" component={CreateFacility} />
              <Stack.Screen name="Konum Bilgilerini Ekle" component={CreateFacility2} />
              <Stack.Screen name="Tesis Özelliklerini Ekle" component={CreateFacility3} />
              <Stack.Screen name="Logo ve Fotoğrafları Ekleyin" component={CreateFacility4} />
              <Stack.Screen name="Ekipman Ekleyin" component={CreateFacility5} />


        </Stack.Navigator>
    )
}

export default FieldStack