import { COLORS } from '../constants';

export const GroupStyles = {
    appContainer: {
        flex: 1
    },
    rangeHeaderContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    activityRangeBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
    },
    rangeBtnWrapper: {
        borderRadius: 50,
        overflow: 'hidden',
        elevation: 3,
        marginRight: 30
    },
    rangeBtn: {
        padding: 10,
        borderRadius: 50,
        width: 100,
        backgroundColor: COLORS.secondary,
        text: {
            fontFamily: "Montserrat-semiBold",
            textTransform: 'uppercase',
            textAlign: 'center',
            color: COLORS.white,
            letterSpacing: 0.8
        }
    },
    rangeBtnAlt: {
        padding: 10,
        borderRadius: 50,
        width: 100,
        backgroundColor: COLORS.white,
        text: {
            fontFamily: "Montserrat-semiBold",
            textTransform: 'uppercase',
            textAlign: 'center',
            color: COLORS.textGray,
            letterSpacing: 0.8
        }
    },
    divider: {
        width: 300,
        backgroundColor: "gray",
        height: 0.8,
        borderRadius: 50,
        elevation: 3,
    },
    activityCardContainer: {
        borderRadius: 3,
        overflow: 'hidden',
        elevation: 3,
        width: 350,
        backgroundColor: COLORS.white,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    activityInnerCard: {
        height: 100,
        width: 350,
        flexDirection: 'row',
    },
    thumbnailContainer: {
        height: "100%",
        width: "30%",
        position: 'relative',
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        text: {
            fontFamily: 'Montserrat-semiBold',
            fontSize: 32,
            textAlign: 'center',
            color: COLORS.white,
            letterSpacing: 1,
            elevation: 3
        }
    },
    activityDescription: {
        flexDirection: 'column',
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: "70%",
        title: {
            fontFamily: 'Montserrat-semiBold',
            fontSize: 20,
            textTransform: 'uppercase'
        },
        text: {
            fontWeight: '400',
            fontSize: 16
        }
    },
    publishBtn: {
        backgroundColor: COLORS.greenMidTone,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 64,
        borderRadius: 50,
        elevation: 3,
        text: {
            fontFamily: 'Montserrat-semiBold',
            fontSize: 15,
            color: COLORS.white,
            textTransform: 'uppercase',
            elevation: 2,
            letterSpacing: 0.8
        },
        trailingIcon: {
            width: 24,
            height: 24,
            marginRight: 5
        },
        wrapper: { 
            position: 'absolute', 
            bottom: 15, 
            marginHorizontal: 0, 
            alignSelf: 'center', 
            borderRadius: 50, 
            overflow: 'hidden' 
        }
    }
};