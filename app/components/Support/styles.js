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
    itemView: {
        width: Styles.width -20,
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    message: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
        color: Color.black
    },
    date: {
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        color: Color.cancelButton,
        marginTop: 5
    },
    divider: {
        width: '100%',
        height: 2,
        marginTop: 5,
        backgroundColor: Color.background1
    },
    footer: {
        backgroundColor: Color.footer
    },
    footerView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: Styles.width
    },
    input: {
        color: Color.text,
        width: '85%',
        paddingHorizontal: 10,
        flex: 1,
        textAlign: "left",
        backgroundColor: Color.white,
        borderRadius: 5
    },
    sendView: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },

})