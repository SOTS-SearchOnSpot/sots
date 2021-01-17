import { StyleSheet } from 'react-native';
import { Constants, Color, Styles } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Color.background       
    },
    container1: {
        flex: 1,
        backgroundColor: Color.background       
    },    
    homeHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    headerText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Color.black
    },
    
    search: {
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.cancelButton,      
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        //justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        backgroundColor: Color.white,
        shadowOpacity:0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    searchText: {
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        textAlign: 'left',
        color: Color.cancelButton
    },
    searchSymbol: {
        marginRight: 5,
        right: 5,
        position: 'absolute'
    },
    location: {
        marginTop: 10,  
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        //justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,        
        backgroundColor: Color.white,
    },
    locationText: {
        marginLeft: 5,
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        textAlign: 'left',
        //color: Color.cancelButton
        width: Styles.width - 70
    },
    categories: {
        //marginTop: 5,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: Color.cancelButton,      
        //height: 30,
        // alignItems: 'center',
        // flexDirection: 'row',
        //justifyContent: 'center',
        padding: 5,
        // shadowOffset: { width: 0, height: 10 },
        // shadowColor: Color.black,
        backgroundColor: Color.white,
        // shadowOpacity:0.05,
        // shadowRadius: 5,
        // elevation: 2,
    }, 
    notification: {
        position: 'absolute',
        right: 5,
        marginRight: 5        
    },
    searchView: {
        margin: 5
    },
    searchbox: {
        width: Styles.width - 10,
        borderColor: Color.cancelButton,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchInput: {
        color: Color.text,
        borderColor: Color.borderColor,
        height: 40,
        width: Styles.width - 70,
        paddingHorizontal: 10,
        //flex: 1,
        textAlign: "left"
    },
    flatlist: {
        marginVertical: 5,
        backgroundColor: Color.white,
    },
    locationView: {
        padding: 5
    },
    locationItem: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
});