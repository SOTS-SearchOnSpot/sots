import {StyleSheet, Dimensions} from 'react-native';
import { Color, Constants, Styles } from '@common';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
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
        flex: 2
    },
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },
    favouriteList: {
        width: width - 10,
        height: 110,
        margin: 5,
        borderRadius: 5,
        borderColor: Color.cancelButton,
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
        //marginRight: 20        
    },
    itemImage: {
        height: 100,
        width: 100,
        borderRadius: 5,
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
    delete: {
        position: 'absolute',
        right: 1,
        bottom: 3,
        marginRight: 4
        
    },
})