import { StyleSheet } from 'react-native'
import { Constants, Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: Color.headerGrayBackground
    },
    backArrow: {
        marginLeft: 10
    },
    layoutInner: {
        width: '100%'
    },
    logoWrap: {
        ...Styles.Common.ColumnCenter,
        flexGrow: 1,
        marginTop: 50
    },
    logo: {
        width: Styles.width * 0.5,
        height: (Styles.width * 0.5) / 2,
        alignItems: 'center',
        justifyContent: 'center'
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