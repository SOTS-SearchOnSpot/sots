import { StyleSheet } from 'react-native';
import { Constants, Color, Styles } from '@common';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 5,
        marginTop: 5
    },
    containerAd: {
        alignItems: 'center',
        padding: 5
    },
    category: {
        flexDirection: 'row',
        marginTop: 5
    },
    categoryItem1: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        borderWidth: 2,
        borderColor: Color.background1,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',        
    },
    categoryItemAd: {
        borderWidth: 2,
        borderColor: Color.background1,  
        paddingTop: 10      
    },
    categoryIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryIconAd: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    categoryTextView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    categoryText: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: Color.black,
        textAlign: 'center',
        width: (Styles.width - 20) / 3,
    },
    categoryText1: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: Color.black,
        textAlign: 'center',
        width: (Styles.width - 20) / 3.1,
    },
    categoryTextWidth: {
        width: (Styles.width - 20) / 2,
    },  
    categoryImage: {
        width: 26,
        height: 26,
        borderRadius: 13,
    }

})