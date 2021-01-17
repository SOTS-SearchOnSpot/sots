import { StyleSheet } from 'react-native';
import { Color, Constants } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background
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
    barCentertext: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: 'bold'
    },
    subCategory: {
        padding: 5,
        width: '100%'
    },
    subCategoryItem: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        marginHorizontal: 15
    },
    flatlist: {
        flexDirection: 'column',
        //marginHorizontal: 15
    }
    
});