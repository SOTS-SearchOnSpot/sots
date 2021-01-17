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
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily
    },
    layoutInner: {
        width: '100%'
    },
    logoWrap: {
        ...Styles.Common.ColumnCenter,
        flexGrow: 1,
        marginTop: 50
    },
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        marginTop: 50
    },
    profilePhoto: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
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
    forgotpassword: {
        color: Color.blackTextSecondary,
        fontFamily: Constants.fontHeader,
        marginTop: 20,
        alignSelf: 'center'
    },
    highlight: {
        fontWeight: 'bold',
        color: Color.primary
    },
    separator: {
        borderBottomWidth: 1,
        flexGrow: 1,
        borderColor: Color.cancelButton
    },
    separatorText: {
        paddingHorizontal: 10,
        color: Color.cancelButton
    },
    separatorWap: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePhotoView: {
        width: 150,
        height: 150
    },
    profileImageEditIcon: {
        position: 'absolute',
        right: 0,
        bottom: 140/7
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
})