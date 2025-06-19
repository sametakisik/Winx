import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";

const FacilityCardOwner = ({name, logoUrl, onPress }) => {


    return (
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Image 
                source={{uri: BASE_URL_PHOTOS + logoUrl}} 
                style={styles.image} 
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{name}</Text>
              
                <View style={styles.footer}>
                 
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>4.8</Text>
                        <Text style={styles.ratingIcon}>★</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: 200,
        height: 230,
        marginRight: 12,
        borderRadius: 14,
        shadowColor: "#2EC4B6",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    textContainer: {
        padding:9 ,
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: "#000",
        marginBottom: 2
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    locationText: {
        fontSize: 12,
        color: "#666",
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2EC4B6'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        marginRight: 4
    },
    ratingIcon: {
        color: '#FFC107',
        fontSize: 14
    }
});

export default FacilityCardOwner;