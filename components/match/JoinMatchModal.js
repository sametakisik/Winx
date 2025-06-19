import { StyleSheet, View } from "react-native"
import MatchDetail from "./MatchDetail.js"
import PersonLabel from "../others/PersonLabel.js"
import Button from "../UI/Button.js"

const JoinMatchModal = () => {


    return <View style={{ flex: 1 }}>
        <MatchDetail />
        <View style={styles.container}>
            <View style={styles.teams}>
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
            </View>
            <View style={styles.teams}>
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />
                <PersonLabel style={styles.players} />

                <Button onPress={() => {}}>Katılma isteği gönder</Button>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    teams: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        width: "40%",
    },

})



export default JoinMatchModal