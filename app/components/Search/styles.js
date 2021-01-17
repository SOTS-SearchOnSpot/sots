import { StyleSheet } from 'react-native';
import { Color, Styles, Constants } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    actionBar: {
        width: '100%',
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
        // flexDirection: 'row',
        //height: 50
    },
    searchView: {
        margin: 5
    },
    searchbox: {
        width: Styles.width - 10,
        borderColor: Color.cancelButton,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },  
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchInput: {
        color: Color.text,
        borderColor: Color.borderColor,
        height: 40,
        width: Styles.width - 70,
        paddingHorizontal: 10,
        //flex: 1,
        textAlign: "left"
    },
    locationInput: {
        color: Color.text,
        borderColor: Color.borderColor,
        height: 40,
        paddingHorizontal: 10,
        flex: 1,
        textAlign: "left"
    },
    favouriteList: {
        width: Styles.width - 10,
        height: 110,
        margin: 5,
        borderRadius: 5,
        borderColor: Color.cancelButton,
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        //marginRight: 20        
    },
    itemImage: {
        height: 100,
        width: 100,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5
    },
    itemName: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        fontWeight: 'bold'
    },
    itemInfo: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'normal'
    },
    itemPrice: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        
    },
})