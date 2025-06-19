import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MatchDetail = ({
  homeTeamName,
  awayTeamName,
  fieldId,
  fieldName,
  dateTime,
  homeTeamLogo,
  awayTeamLogo,
  weatherCondition = "sunny", // Default to sunny
  temperature = "30°C", // Default temperature
}) => {
  // Weather icon mapping
  const weatherIcons = {
    sunny: "weather-sunny",
    cloudy: "weather-cloudy",
    rainy: "weather-rainy",
    thunderstorm: "weather-lightning",
    snowy: "weather-snowy",
    windy: "weather-windy",
    foggy: "weather-fog",
    partlycloudy: "weather-partly-cloudy",
  };

  const weatherIcon =
    weatherIcons[weatherCondition.toLowerCase()] || "weather-sunny";

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Teams Section */}
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          {homeTeamLogo && (
            <Image source={{ uri: homeTeamLogo }} style={styles.teamLogo} />
          )}
          <Text style={styles.teamName} numberOfLines={2}>
            {homeTeamName}
          </Text>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.teamContainer}>
          <Text style={styles.teamName} numberOfLines={2}>
            {awayTeamName}
          </Text>
          {awayTeamLogo && (
            <Image source={{ uri: awayTeamLogo }} style={styles.teamLogo} />
          )}
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <TouchableOpacity
            style={styles.detailItem}
            onPress={() =>
              navigation.navigate("FieldStack", {
                screen: "Saha Detayları",
                params: { fieldId: fieldId },
              })
            }
          >
            <Icon
              name="stadium"
              size={20}
              color="#5D3FD3"
              style={styles.icon}
            />
            <Text style={styles.fieldName}>{fieldName}</Text>
          </TouchableOpacity>

          <View style={styles.weatherContainer}>
            <Icon name={weatherIcon} size={24} color="#FFA500" />
            <Text style={styles.temperature}>{temperature}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon
            name="clock-outline"
            size={20}
            color="#5D3FD3"
            style={styles.icon}
          />
          <Text style={styles.dateTime}>{dateTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  teamContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  teamLogo: {
    width: 36,
    height: 36,
    marginHorizontal: 8,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    maxWidth: 100,
  },
  vsContainer: {
    paddingHorizontal: 10,
  },
  vsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#e74c3c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsContainer: {
    width: "100%",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  fieldName: {
    fontSize: 15,
    color: "#34495e",
    fontWeight: "500",
  },
  dateTime: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
    marginLeft: 6,
  },
});

export default MatchDetail;
