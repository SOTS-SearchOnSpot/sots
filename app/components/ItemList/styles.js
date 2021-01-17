import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background
    },
    header: {
        width: '100%',
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
        // flexDirection: 'row',
        // height: 50
    },
    actionBarLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 5,
        flex: 2
    },
    actionBarMiddle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    actionBarRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 5,
        flex: 2
    },
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },    
    flatlist: {
        flexDirection: 'column',
        marginVertical: 5,
        backgroundColor: Color.white,
    },
    item: {
        margin: 4,
        padding: 5,
        flexDirection: 'column', 
        width: (Styles.width / 2) - 10,
        backgroundColor: Color.white,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: Color.cancelButton
    },
    itemImage: {
        height: 100,
        width: "100%",
    },
    itemDetails: {
        flexDirection: 'column',

    },
    itemName: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'bold'
    },
    itemInfo: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 7,
        fontWeight: 'normal'
    },
    itemPrice: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        position: 'absolute',
        right: 0,
        marginRight: 5
    },
    topView: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        height: 24,
        width: (Styles.width / 2) - 11,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    favorites: {
        position: 'absolute',
        right: 1,
        marginRight: 4
        
    },
    priceView: {
        flexDirection: 'row',
        width: '100%',

    },
    submitButton: {
        marginTop: 20,
        borderRadius: 5,        
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        backgroundColor: Color.background1,
        shadowOpacity:0.05,
        shadowRadius: 5,
        elevation: 2,
        width: Styles.width - 20,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Constants.fontHeader
    },
    selectText: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        color: Color.primary,
        fontWeight: 'bold'
    },
    view: {
        marginTop: 15,
        height: 2,
        width: Styles.width - 20,
        marginHorizontal: 10,
        backgroundColor: Color.background1
    },
    catItemView: {
        height: 35,
        width: (Styles.width - 50) / 4,
        borderRadius: 5,
        backgroundColor: Color.background1,
        marginLeft: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    catItemText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.primary,
    },
    Itemrow: {
        marginTop: 15,
        flexDirection: 'row'
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Color.headerGrayBackground,
        alignItems: 'center',
        justifyContent: 'center'
    }
});