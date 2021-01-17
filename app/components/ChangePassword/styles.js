import { StyleSheet } from 'react-native'
import { Constants, Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1
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
    subContain: {
        paddingHorizontal: Styles.width * 0.1,
        paddingBottom: 50
    },
    loginForm: {},
    inputwrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Color.blackDivide
    },
    input: {
        color: Color.text,
        borderColor: Color.borderColor,        
        height: 40,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 8,
        flex: 1,
        textAlign: "left"
    },
    loginButton: {
        marginTop: 20,
        borderRadius: 5,        
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        backgroundColor: Color.white,
        shadowOpacity:0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Constants.fontHeader

    },

})