import { StyleSheet } from 'react-native';
import { Constants, Color } from '@common';

export default StyleSheet.create({
    container: {
        //alignItems: 'center',
        justifyContent: 'center'
    },
    count: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: Color.white
    },
    countView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: 'red',
        position: 'absolute',
        top: -10,
        right: -10
    }
})