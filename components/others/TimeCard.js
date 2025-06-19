import { StyleSheet, Text, View } from "react-native"

const TimeCard = ({time, state}) => {
    const getStateColor = () => {
        switch (state) {
          case 'Boş':
            return '#4CAF50'; // yeşil
          case 'Dolu':
            return '#F44336'; // kırmızı
          case 'Geçmiş':
            return '#FFC107'; // sarı
          default:
            return '#e0e0e0';
        }
      };
    return <View style={styles.container}>
        <Text style={styles.time}>{time}</Text>
        <Text style={[styles.state, {color: getStateColor()}]}>{state}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ddd",
        alignItems: "center",
        padding: 3,
        borderColor: "black",
        marginHorizontal: 3,
        marginBottom: 5,
        borderRadius: 4
    },
    time: {
        fontSize: 22,
        fontWeight: "bold",
    },
    state: {
        fontSize: 15,
        fontWeight: "600"
    }
})

export default TimeCard