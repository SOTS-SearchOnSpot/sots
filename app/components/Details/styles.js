import { StyleSheet } from 'react-native';
import { Color, Constants, Styles } from '@common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    chatInfoView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Color.white,
        height: Styles.height / 3,
        width: '100%'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.headerGrayBackground
    },
    backArrow: {
        marginLeft: 10
    },
    headerRight: {
        position: 'absolute',
        right: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightIcon: {
        marginLeft: 10
    },
    imageView: {
        width: '100%',
        height: Styles.height/ 2.5
    },
    image: {
        width: '100%',
        height: '100%',
        borderColor: Color.background1,
        borderWidth: 1
    },
    imageList: {
        width: '100%',
        height: '100%',
    },
    imageCountView: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: Color.headerGrayBackground,
        alignItems: 'center',
        justifyContent: 'center'
    },
    countText: {
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        color: Color.white
    },
    itemView: {
        width: '100%',
        padding: 10,                        
    },
    itemNameView: {
        width: '100%',
        flexDirection: 'row',        
    },
    itemName: {
        fontFamily: Constants.fontFamily,
        fontWeight: 'bold',
        fontSize: 14,
        color: Color.black,
        marginLeft: 5
    },
    year: {
        position: 'absolute',
        right: 5,
    },
    price: {
        fontFamily: Constants.fontFamily,
        fontWeight: 'bold',
        fontSize: 16,
        color: Color.primary ,
        marginTop: 5
    },
    infoView: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black
    },
    infoItemView: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: Color.background1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeView: {
        height: '100%',
        width: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0
    },
    likeItemView: {
        //paddingTop: 0,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: Color.headerGrayBackground,
        // height: 80,
        width: 40,
        marginBottom: 20
    },
    likeItem: {
        marginTop: 10,
        //flexDirection: 'column',
        alignItems: 'center'
    },
    likeText: {
        fontFamily: Constants.fontFamily,
        fontSize: 8,
        color: Color.white,
        alignSelf: 'center'        
    },
    googleAd: {
        width: '95%',
        height: Styles.height / 3,
        marginTop: 10,
        marginLeft: 10,
        borderColor: Color.background1,
        borderRadius: 5,
        borderWidth: 1
    },
    ourImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,       
    },
    googleAd1: {
        width: '95%',
        height: Styles.height / 2,
        marginTop: 10,
        marginLeft: 10,
        borderColor: Color.background1,
        borderRadius: 5,
        borderWidth: 1
    },
    locationText: {
        alignSelf: 'center',
        width: Styles.width / 3,
        textAlign: 'center',
    },
    locationView: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: Color.background1,
        borderRadius: 5
    },
    emptyView: {
        height: 10,
    },
    divider: {
        marginTop: 5,
        backgroundColor: Color.background1,
        height: 1,
        width: '100%'
    },
    descriptionText: {
        marginTop: 10,
        marginLeft: 10
    },
    report: {
        width: Styles.width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    reportView: {
        marginRight: 5,
        position: 'absolute',
        right: 0
    },
    reportText: {
        fontFamily: Constants.fontFamily,
        fontWeight: 'bold',
        fontSize: 14,
        color: Color.primary
    },
    descriptionContent: {
        width: Styles.width - 25,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 15,
        color: Color.black,
        textAlign: 'justify',
        fontFamily: Constants.fontFamily,
        fontSize: 13               
    },
    scrollView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 15
    },
    profileView: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    profileInfoView: {
        marginLeft: 10
    },
    profileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.black        
    },
    profileDate: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.cancelButton 
    },
    viewProfile: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        color: Color.black,        
        fontWeight: 'bold', 
    },
    profileRightIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 0        
    },
    rating: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: 4
    },
    ratingText: {
        fontFamily: Constants.fontFamily,
        fontSize: 13,
        color: Color.cancelButton
    },
    item: {
        margin: 4,
        padding: 5,
        flexDirection: 'column', 
        width: (Styles.width / 2) - 10,
        backgroundColor: Color.white,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: Color.cancelButton
    },
    itemImage: {
        height: 100,
        width: "100%",
    },
    itemDetails: {
        flexDirection: 'column',

    },
    relatedItemName: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'bold'
    },
    itemInfo: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 7,
        fontWeight: 'normal'
    },
    itemPrice: {
        color: Color.black,
        fontFamily: Constants.fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        position: 'absolute',
        right: 0,
        marginRight: 5
    },
    favorites: {
        position: 'absolute',
        right: 1,
        marginRight: 4        
    },
    priceView: {
        flexDirection: 'row',
        width: '100%',
    },
    topView: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        height: 24,
        width: (Styles.width / 2) - 11,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    flatlist: {
        marginTop: 10
    },
    marginItem: {
        marginLeft: 5,
        marginTop: 5
    },
    chatView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.headerGrayBackground
    },
    profileIconView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Styles.width - 120,
        marginTop: 10
    },
    communicationIconView:{
        flexDirection: 'row',
        alignItems: 'center',        
        paddingHorizontal: 5,        
    },
    communicationIcon: {
        width: (Styles.width - 220) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.primary,
        borderWidth: 1,
    },

    communicationView: {
        position: 'absolute',
        right: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tipHeaderText: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: Color.primary,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        marginTop: 10
    },
    tipContentItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 10,
        marginTop: 20
    },
    contentNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        color: Color.primary,
        fontWeight: 'bold',
        width: 40
    },
    tipContent: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        color: Color.black,
        width: Styles.width - 75
    },
    chatButton: {
        borderRadius: 5,        
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowColor: Color.black,
        backgroundColor: Color.white,
        shadowOpacity:0.05,
        shadowRadius: 5,
        elevation: 2,
        borderColor: Color.background1, 
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        marginHorizontal: 20,
        width: Styles.width - 40

        
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Constants.fontHeader,
        color: Color.primary        
    },
});