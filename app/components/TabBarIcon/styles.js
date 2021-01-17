import { StyleSheet } from 'react-native';
import { Constants } from '@common';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: (color) => ({
        fontSize: 11,
        fontFamily: Constants.fontFamily,
        color: color,
        marginTop: 2
    })
})