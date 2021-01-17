import { StyleSheet } from 'react-native'
import { Constants, Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    actionBar: {
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
    layoutInner: {
        width: Styles.width -20,
        marginHorizontal: 10
    },
    itemView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10
    },
    itemText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black
    },
    itemButton: {
        position: 'absolute',
        right: 0,
        padding: 5
    }
    
})