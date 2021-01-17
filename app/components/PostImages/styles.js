import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common';
import { Right } from 'native-base';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    subContain: {
        paddingHorizontal: Styles.width * 0.05,
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
    submitButton: {
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
    options: {
        marginTop: 10,
    },
    sortedView: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: Styles.width - ((Styles.width * 0.05) * 2)
    },
    optionsMargin: {
        width: (Styles.width - (((Styles.width * 0.05) *2) + 10)) / 2,
    },
    optionsView: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Color.background1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',        
    },
    selectedView: {
        borderColor: Color.primary
    },
    infoText: { 
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,
    },
    optionText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,        
    },
    imageView: {
        width: '100%',
        height: Styles.height / 3,        
    },
    image: {
        width: '100%',
        height: '100%'
    },
    countView: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Color.headerGrayBackground,
        alignItems: 'center',
        justifyContent: 'center'   
    },
    countText: {
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        color: Color.white,        
    },
    selectImageView: {
        marginTop: 10,
        marginVertical: 5,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectButtonView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        backgroundColor: Color.background1,
        shadowOpacity:0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    selectText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        color: Color.primary,
    },
    uploadDetails: {
        backgroundColor: Color.background1,
        width: Styles.width - 20,
        marginHorizontal: 10,
        position: 'absolute',
        bottom: Styles.height / 4,
        height: 50
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
});