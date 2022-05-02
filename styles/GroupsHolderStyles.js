import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
    app_container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Montserrat-semiBold',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    text: {
        fontWeight: '400',
        fontSize: 16,
    },
    groupCard: {
        padding: 15, 
        backgroundColor: "#fff", 
        height: 115, 
        width: "100%", 
        elevation: 5, 
        borderRadius: 3, 
        flexDirection: 'row', 
        marginBottom: 15
    },
    thumbnailContainer: { 
        height: "100%", 
        width: "25%", 
        position: 'relative' 
    },
    thumbnail: { 
        backgroundColor: COLORS.secondary, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: "100%" 
    },
    thumbnailText: { 
        color: "#fff",
        fontFamily: 'Montserrat-semiBold', 
        fontSize: 32,
        textAlign: 'center'
    },
    thumbnailBadge: { 
        position: 'absolute', 
        top: -10, 
        right: -10 
    },
    groupInfoContainer: { 
        flexDirection: 'column', 
        flexGrow: 1, 
        width: "65%", 
        marginLeft: 10 
    }
});

export default styles;