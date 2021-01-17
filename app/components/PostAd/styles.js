import { StyleSheet } from 'react-native';
import { Color, Constants } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    header: {
        width: '100%',
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: Color.background1

    },
    actionBarLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
    actionBarMiddle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    actionBarRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1
    },
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: 'bold'
    },
    categories: {        
        padding: 5,        
        backgroundColor: Color.white,
    },
});