import { StyleSheet } from 'react-native';
import { Color, Styles, Constants } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    topView: {
        height: 50,
        width: Styles.width,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Color.background1,
        borderBottomWidth: 1
        
    },
    icon: {
        marginLeft: 15
    },
    headerView: {
        width: Styles.width - 45,
        alignItems: 'center',
        justifyContent: 'center'
    }  ,
    headerText: {
        fontFamily: Constants.fontFamily,
        color: Color.black,
        fontSize: 18,
    },
    msgItemView: {
        width: Styles.width - 20,
        marginHorizontal: 10
    },
    msgItemPosLeft: {
        alignItems: 'flex-start'
    },
    msgItemPosRight: {
        alignItems: 'flex-end'
    },
    msgItemLeft: {
        backgroundColor: Color.black,
        minHeight: 50,
        maxWidth: Styles.width - 40,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15, 
        padding: 10       
    },
    msgItemRight: {
        backgroundColor: Color.primary,
        minHeight: 50,
        maxWidth: Styles.width - 40,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 10              
    },
    msg: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.white
    },
    flatList: {
        height: Styles.height - 100,
        paddingBottom: 10
    },
    bottomView: {
        height: 50,
        width: Styles.width,
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Color.background1,
        flexDirection: 'row'
    },
    input: {
        color: Color.text,
        paddingHorizontal: 10,
        paddingBottom: 5,
        flex: 1,
        textAlign: "left",
        width: Styles.width - 50
    },
    sendIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
})