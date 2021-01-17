import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white

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
    optionText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,        
    },
    selectedView: {
        borderColor: Color.primary
    },
    selectedOptionText: {
        fontWeight: 'bold'
    },
    options: {
        marginTop: 10,
        marginLeft: 10
    },
    sortedView: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        width: Styles.width
    },
    optionsMargin: {
        width: (Styles.width - 30) / 2,
    },
    optionsMargin1: {
        width: (Styles.width - 36) / 3,
    },
    optionsMarginDate: {
        width: (Styles.width - 26),
    },
    optionsMargin2: {
        width: (Styles.width - 40) / 4,
    },
    priceView: {
        marginTop: 10,
        marginHorizontal: 5        
    },
    inputTextView: {
        flexDirection: 'row',
        marginTop: 10
    },
    inputText: {
        width: (Styles.width - 30) / 2,
        marginLeft: 5,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Color.background1,
        padding: 5,
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black
    },
    searchView: {
        flexDirection: 'row',
        paddingLeft: 5,
        borderColor: Color.background1,
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 5,
        marginTop: 10,
        alignItems: 'center',
        //height: 40
    },
    searchText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,
        width: (Styles.width - 20) / 1.3,
    },
    searchSymbol: {
        marginRight: 0,
        right: 5,
        position: 'absolute'
    },
    searchResultView: {
        marginTop: 10,
        marginLeft: 25
    },
    searchItemView: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    resultboxView: {
        borderRadius: 3,
        borderWidth: 2,
        borderColor: Color.background1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18       
    },
    buttonView: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: Color.background1,
        marginTop: 10
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
    marginView: {
        marginBottom: 60
    }    
});