import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FieldCard = ({ name, rating, price, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
            <Image source={require("../../assets/saha.jpg")} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{name}</Text>
                
                <View style={styles.infoContainer}>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={16} color="#FF9F1C" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                    <View style={styles.location}>
                        <Ionicons name="location-outline" size={14} color="#FF6B6B" />
                        <Text style={styles.locationText}>1.2 km</Text>
                    </View>
                </View>
                
                <View style={styles.footer}>
                    <Text style={styles.price}>{price}₺ <Text style={styles.perHour}>/saat</Text></Text>
                    <View style={styles.sportTag}>
                        <Text style={styles.sportText}>Kadıköy</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        width: "100%",
        height: 130,
        alignItems: "center",
        padding: 12,
        borderRadius: 14,
        marginBottom: 16,
        shadowColor: "#2EC4B6",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#F0F0F0"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: "#E9E9E9"
    },
    details: {
        flex: 1,
        marginLeft: 14,
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: 4
    },
    title: {
        fontSize: 19,
        fontWeight: "700",
        color: "#2B2D42",
        marginBottom: 6
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF5E8",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 12
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FF9F1C",
        marginLeft: 4
    },
    location: {
        flexDirection: "row",
        alignItems: "center"
    },
    locationText: {
        fontSize: 13,
        fontWeight: "500",
        color: "#FF6B6B",
        marginLeft: 4
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    price: {
        fontSize: 20,
        fontWeight: "800",
        color: "#2EC4B6"
    },
    perHour: {
        fontSize: 14,
        fontWeight: "500",
        color: "#8D99AE"
    },
    sportTag: {
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#EDEDED"
    },
    sportText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6C757D",
        letterSpacing: 0.5
    }
});

export default FieldCard;