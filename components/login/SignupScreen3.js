import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { registerOwner } from "../../utils/OwnerApiService";

const SignupScreen3 = () => {
  const [selectedRole, setSelectedRole] = useState("");
const navigation = useNavigation()

  const route = useRoute();
  const { registerData2 } = route.params;

console.log(registerData2);


  const handleSubmit = async () => {
    if(selectedRole === "customer") navigation.navigate("Kayıt4", {
     registerData3: { ...registerData2}})
    if(selectedRole === "owner") try {
        await registerOwner({...registerData2, role: "Owner"})
        console.log("başarılı");
        
    } catch (error) {
        console.log(error)
    }
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Türünü Seçin</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => setSelectedRole("customer")}>
          <View style={[
            styles.selectContainer, 
            selectedRole === "customer" && styles.selected
          ]}>
            <Text style={styles.text}>Oyuncu</Text>
            <Image
              source={
                selectedRole === "customer" ? require("../../assets/player.png") : require("../../assets/playerGray.png")
             }
              style={styles.playerImage}
            />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setSelectedRole("owner")}>
          <View style={[
            styles.selectContainer, 
            selectedRole === "owner" && styles.selected
          ]}>
            <Text style={styles.text}>Tesis Sahibi</Text>
            <MaterialCommunityIcons 
              name="soccer-field" 
              size={100} 
              color={selectedRole === "owner" ? Colors.primary : "#adadad"} 
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonText}
        disabled={!selectedRole}
      >
        Onayla
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.primary,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  selectContainer: {
    width: 250,
    height: 200,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#adadad",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    padding: 20,
  },
  selected: {
    borderColor: Colors.primary,
    borderWidth: 3,
    backgroundColor: '#f5f5f5',
  },   
  playerImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    width: '80%',
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignupScreen3;