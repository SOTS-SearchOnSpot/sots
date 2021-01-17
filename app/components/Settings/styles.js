import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common'

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
    item: {
        marginHorizontal: 10
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Constants.fontFamily,
        color: Color.black     
    },
    rightIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 0        
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
    pickerSelect: {
        height: 50,
        width: '100%',
        paddingBottom: 10
    },
    itemButton: {
        position: 'absolute',
        right: 0,
        padding: 5
    },
    itemText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black
    },
});