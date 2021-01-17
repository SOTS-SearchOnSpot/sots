import { StyleSheet } from 'react-native';
import { Color, Styles, Constants } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1
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
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,        
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
    profileItems:{
        flex: 1
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
    },
    bottomView: {
        height: 2,
        width: '100%',
        backgroundColor: Color.lightGray
    },
    item: {
        marginHorizontal: 10
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily,
        color: Color.black     
    },
    itemNameSupport: {
        fontSize: 14,
        fontFamily: Constants.fontFamily,
        color: Color.cancelButton,
        marginTop: 5
    },
    rightIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 0        
    }
});