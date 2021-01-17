import { StyleSheet } from 'react-native'
import { Constants, Styles, Color } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    profileHeader: {
        width: '100%',
        height: (Styles.height / 3) + 14,
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
    tabView: {
        marginTop: 10
    },
    tabHeaderView: {
        backgroundColor: Color.background1,        
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    tabItemView:{
        width: (Styles.width - 20) / 2,
       // flex: 0.32,
        backgroundColor: Color.background1,
    },
    tabButton: {
        height: 50,
        justifyContent: "center",
    },
    tabButtonText: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: "center",
        fontSize: 12,
        fontFamily: Constants.fontFamily
    },
    tabActive: {
        marginTop: 1,
        borderBottomWidth: 2,
        borderBottomColor: Color.primary,
    },
    aboutItemView: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    divider: {
        backgroundColor: Color.background1,
        height: 2,
        width: Styles.width - 20,
        marginTop: 5
    },
    aboutItem: {
        flexDirection: 'row',
        alignItems: 'center'        
    },
    aboutIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        // borderWidth: 1,
        backgroundColor: Color.white,
        borderColor: Color.background1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
    aboutText: {
        marginLeft: 5,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        color: Color.black,
    },
    addReview: { 
        color: Color.primary, 
        marginTop: 10,
        fontSize: 13, 
        fontWeight: "bold",        
        fontFamily: Constants.fontFamily
    },


    flatlist: {
        marginVertical: 5,
        backgroundColor: Color.white,
    },
    item: {
        width: Styles.width - 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color.background1
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    itemDetails: {        
        padding: 5
    },
    itemName: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,
        marginLeft: 4,
    },
    rating: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: 4
    },
})