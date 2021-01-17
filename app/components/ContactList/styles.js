import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
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
    rightIcons: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 5
    },
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },
    flatlist: {
        marginVertical: 5,
        backgroundColor: Color.white,
    },
    item: {
        width: Styles.width - 20,
        marginHorizontal: 10,
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
    topView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5       
    },
    filterText: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Color.black,
        fontWeight: 'bold'  
    },
    cusRatingView: {
        marginHorizontal: 5,
        marginTop: 10
    },
    infoText: { 
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        color: Color.black,
        fontWeight: 'bold',
        marginLeft: 5        
    },
    ratingView: {
        marginTop: 5,
        flexDirection: 'row',
    },
    starView: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Color.background1,
        padding: 5,
        alignItems: 'center',   
        paddingLeft: 1,
        flexDirection: 'row',
        marginLeft: 5
    },
    rating: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: 4
    },
    pluseText: {
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        color: Color.black,
    },
    selectedView: {
        borderColor: Color.primary
    },
    buttonView: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: Color.background1,
        position: 'absolute',
        bottom: 1
    },
    button: {
        flex: 1,
        padding: 10,
        height: 50,   
        alignItems: 'center',
        justifyContent: 'center'             
    },
    buttonText: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
        color: Color.white
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: Styles.width,
        //flexDirection: 'row'
    },
    bottomButton:{
        width: Styles.width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.primary
    },
    bottomText:{
        fontFamily: Constants.fontFamily,
        fontSize: 15,
        color: Color.white
    },
    removeBackground: {
        backgroundColor: Color.cancelButton
    }
});