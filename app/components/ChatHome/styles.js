import { StyleSheet } from 'react-native';
import { Color, Styles, Constants } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white 
    },
    profileHeader: {
        width: '100%',
        height: Styles.height / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerInsideView: {
        width: '100%',
    },
    profileImageView: {
        height: 155,
        width: 155,
        borderRadius: 78, 
        backgroundColor: Color.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,     
        resizeMode: 'contain'   
    },
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
    },
    profileName: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily,
        color: Color.black,
    },
    profilEdit: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily,
        color: Color.primary
    },
    bottomBorder: {
        height: 6,
        width: '100%',
        backgroundColor: Color.lightGray
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Styles.width,
        marginTop: 5
    },
    profileTextView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Color.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    profileText: {
        color: Color.white,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },
    imageView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10
    },
    chatProfileNameView: {
        marginLeft: 5,
        width: Styles.width - 85,
        height: 60,
        justifyContent: 'center'
    },
    chatProfileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        color: Color.black,
        marginLeft: 5
    },
    divider: {
        width: Styles.width - 20,
        height: 2,
        backgroundColor: Color.background1,
        marginHorizontal: 10,
        marginTop: 10
    }
});