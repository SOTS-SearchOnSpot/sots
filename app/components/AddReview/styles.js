import { StyleSheet } from 'react-native'
import { Constants, Styles, Color } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        padding: 10      
    },
    reviewHeader: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.black,
        marginTop: 15,     
    },
    review: {
        marginTop: 15,
        width: Styles.width / 1.5,
        marginLeft: 10
    },
    commentText: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
        color: Color.cancelButton,
        marginTop: 15
    },
    comment: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,
        height: 100,
        width: Styles.width - 20,
        borderRadius: 4,
        borderColor: Color.background1,
        borderWidth: 1,
        marginTop: 15
    },
    submitButton: {
        marginTop: 15,
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