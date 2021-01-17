import { Dimensions, Platform } from 'react-native';
//import { Languages, Icons } from '@common'
import Languages from './Languages';
import Icons from './Icons';
import Images from './Images';

const { width, height } = Dimensions.get('window');
const Constants = {
    Language: 'en',
    fontFamily: 'OpenSans',
    fontHeader: 'Baloo',
    Home: 'Home',
    PostAd: 'PostAd',
    //APIs
    BaseUrl: "http://35.232.1.186/",
    GetToken: "aio/token_api",
    LoginUrl: "aio/login_api",
    RegisterUrl: "aio/register_api",
    ProfileUrl: "aio/profile_api",
    EditProfileUrl: "aio/edit_profile_api",
    UserValidation: "aio/forgot_password_api",
    SendRating: "aio/post_rating_api",
    GetRating: "aio/rating_api",
    CreateAdUrl: "aio/create_ads_api",
    LocationUrl: "aio/location_api",
    AdDetailsUrl: "aio/ads_api",
    LikeUrl: "aio/post_like_ads_api",
    UnLikeUrl: "aio/post_unlike_ads_api",
    FavouriteUrl: "aio/post_favorites_ads_api",
    UnFavouriteUrl: "aio/post_unfavorites_ads_api",
    ContactListUrl: "aio/contacts_api",
    AddContactUrl: "aio/add_contact_api",
    RemoveContactUrl: "aio/remove_contact_api",
    OurImage: "aio/google_ads_api",
    DeleteAdUrl: "aio/delete_ads_api",
    ReportAdUrl: "aio/post_report_ads_api",
    AddPlayerIdUrl: "aio/add_player_id_api",
    DeletePlayerIdUrl: "aio/delete_player_id_api",
    NotificationUrl: "aio/notification_api",
    DeleteNotificationUrl: "aio/delete_notification_api",
    FilterAdsUrl: "aio/search_filter_ads_api",
    AddChatUser: "aio/post_chat_api",
    //URLs
    DefaultImage: "",    
    Link: "https://youtu.be/",
    WhatsappConnection: "https://wa.me/+6591237765",

    //Firebase Config
    FireConfig: {
        apiKey: Platform.OS == 'ios' ? "AIzaSyALSOupIUIrLHEbNPWqm14iw2U5LuReRAY" : "AIzaSyCPfUm3oa1SksJtw8CYJnNk0LN_u_7d0Rw",
        projectId: "sots-674f3",
        appId: Platform.OS == 'ios' ? "1:365373202187:ios:97354f160a79d7ad384c0e" : "1:365373202187:android:1395f78bae17c751384c0e",
        messagingSenderId: "365373202187",
        storageBucket: "sots-674f3.appspot.com",
        authDomain: "sots-674f3.firebaseapp.com",
        databaseURL: "https://sots-674f3.firebaseio.com/"
    },

    //datas
    Icon: {
        CommunityIcons: 'MaterialCommunityIcons',
        FontAwesome: 'FontAwesome'
    },
    Categories: [
        {
            id: 1,
            name: 'Business',
            icon: Images.Business,
            subCategory:[
                {
                    id: 1001,
                    name: 'Inventor1'
                },
                {
                    id: 1002,
                    name: 'Inventor2'
                },
                {
                    id: 1003,
                    name: 'Inventor3',
                    subCategory:[
                        {
                            id: 10031,
                            name: 'Inventor31'
                        },
                        {
                            id: 10032,
                            name: 'Inventor32'
                        },
                        {
                            id: 10033,
                            name: 'Inventor33'
                            
                        },
                        {
                            id: 10034,
                            name: 'Inventor34'
                        },
                        {
                            id: 10035,
                            name: 'Inventor35'
                        },
                        {
                            id: 10036,
                            name: 'Inventor36'
                        },
                        {
                            id: 10037,
                            name: 'Inventor37'
                        },
                        {
                            id: 10038,
                            name: 'Inventor38'
                        },
                        {
                            id: 10039,
                            name: 'Inventor39'
                        },
                        {
                            id: 100310,
                            name: 'Inventor310'
                        },
                        {
                            id: 100311,
                            name: 'Inventor311'
                        },
                        {
                            id: 100312,
                            name: 'Inventor312'
                        },
                        {
                            id: 100313,
                            name: 'Inventor313'
                        },
                        {
                            id: 100314,
                            name: 'Inventor314'
                        },
                        {
                            id: 100315,
                            name: 'Inventor315'
                        },
                        {
                            id: 100316,
                            name: 'Others'
                        },
                        {
                            id: 16,
                            name: 'ViewAll'
                        }
                    ]                    
                },
                {
                    id: 16,
                    name: 'ViewAll'
                }
            ]
        },
        {
            id: 2,
            name: 'Agriculture',
            icon: Images.Agriculture,
            subCategory:[
                {
                    id: 2001,
                    name: 'SubAgriculture1'
                },
                {
                    id: 2002,
                    name: 'SubAgriculture2'
                },
                {
                    id: 2003,
                    name: 'SubAgriculture3'
                },
                {
                    id: 2004,
                    name: 'SubAgriculture4'
                },
                {
                    id: 2005,
                    name: 'SubAgriculture5'
                },
                {
                    id: 2006,
                    name: 'SubAgriculture6'
                },
                {
                    id: 2007,
                    name: 'SubAgriculture7'
                },
                {
                    id: 2008,
                    name: 'SubAgriculture8'
                },
                {
                    id: 2009,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                }
            ]
        },
        {
            id: 3,
            name: 'Services',
            icon: Images.Service,
            subCategory:[
                {
                    id: 3001,
                    name: 'SubServices1'
                },
                {
                    id: 3002,
                    name: 'SubServices2'
                },
                {
                    id: 3003,
                    name: 'SubServices3'
                },
                {
                    id: 3004,
                    name: 'SubServices4'
                },
                {
                    id: 3005,
                    name: 'SubServices5'
                },
                {
                    id: 3006,
                    name: 'SubServices6'
                },
                {
                    id: 3007,
                    name: 'SubServices7'
                },
                {
                    id: 3008,
                    name: 'SubServices8'
                },
                {
                    id: 3009,
                    name: 'SubServices9'
                },
                {
                    id: 3010,
                    name: 'SubServices10'
                },
                {
                    id: 3011,
                    name: 'SubServices11'
                },
                {
                    id: 3012,
                    name: 'SubServices12'
                },
                {
                    id: 3013,
                    name: 'SubServices13'
                },
                {
                    id: 3014,
                    name: 'SubServices14'
                },
                {
                    id: 3015,
                    name: 'SubServices15'
                },
                {
                    id: 3016,
                    name: 'SubServices16'
                },
                {
                    id: 3017,
                    name: 'SubServices17'
                },
                {
                    id: 3018,
                    name: 'SubServices18'
                },
                {
                    id: 3019,
                    name: 'SubServices19'
                },
                {
                    id: 3020,
                    name: 'SubServices20'
                },
                {
                    id: 3021,
                    name: 'SubServices21'
                },
                {
                    id: 3022,
                    name: 'SubServices22'
                },
                {
                    id: 3023,
                    name: 'SubServices23'
                },
                {
                    id: 3024,
                    name: 'SubServices24'
                },
                {
                    id: 3025,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 4,
            name: 'Gadgets',
            icon: Images.Gadget,
            subCategory:[
                {
                    id: 4001,
                    name: 'SubGadgets1'
                },
                {
                    id: 4002,
                    name: 'SubGadgets2'
                },
                {
                    id: 4003,
                    name: 'SubGadgets3'
                },
                {
                    id: 4004,
                    name: 'SubGadgets4'
                },
                {
                    id: 4005,
                    name: 'SubGadgets5'
                },
                {
                    id: 4006,
                    name: 'SubGadgets6'
                },
                {
                    id: 4007,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 5,
            name: 'Electronics',
            icon: Images.Electronics,
            subCategory:[
                {
                    id: 5001,
                    name: 'SubElectronics1'
                },
                {
                    id: 5002,
                    name: 'SubElectronics2'
                },
                {
                    id: 5003,
                    name: 'SubElectronics3'
                },
                {
                    id: 5004,
                    name: 'SubElectronics4'
                },
                {
                    id: 5005,
                    name: 'SubElectronics5'
                },
                {
                    id: 5006,
                    name: 'SubElectronics6'
                },
                {
                    id: 5007,
                    name: 'SubElectronics7'
                },
                {
                    id: 5008,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 6,
            name: 'Automobiles',
            icon: Images.Automobile,
            subCategory:[
                {
                    id: 6001,
                    name: 'SubAutomobiles1'
                },
                {
                    id: 6002,
                    name: 'SubAutomobiles2'
                },
                {
                    id: 6003,
                    name: 'SubAutomobiles3'
                },
                {
                    id: 6004,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 7,
            name: 'Fashion',
            icon: Images.Fashion,
            subCategory:[
                {
                    id: 7001,
                    name: 'SubFashion1'
                },
                {
                    id: 7002,
                    name: 'SubFashion2'
                },
                {
                    id: 7003,
                    name: 'SubFashion3'
                },
                {
                    id: 7004,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 8,
            name: 'Pets',
            icon: Images.Pets,
            subCategory:[
                {
                    id: 8001,
                    name: 'SubPets1'
                },
                {
                    id: 8002,
                    name: 'SubPets2'
                },
                {
                    id: 8003,
                    name: 'SubPets3'
                },
                {
                    id: 8004,
                    name: 'SubPets4'
                },
                {
                    id: 8005,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 9,
            name: 'Furniture',
            icon: Images.Furniture,
            subCategory:[
                {
                    id: 9001,
                    name: 'Subfurniture1'
                },
                {
                    id: 9002,
                    name: 'Subfurniture2'
                },
                {
                    id: 9003,
                    name: 'Subfurniture3'
                },
                {
                    id: 9004,
                    name: 'Subfurniture4'
                },
                {
                    id: 9005,
                    name: 'Subfurniture5'
                },
                {
                    id: 9006,
                    name: 'Subfurniture6'
                },
                {
                    id: 9007,
                    name: 'Subfurniture7'
                },
                {
                    id: 9008,
                    name: 'Subfurniture8'
                },
                
                {
                    id: 9009,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 10,
            name: 'Properties',
            icon: Images.House,
            subCategory:[
                {
                    id: 10001,
                    name: 'SubProperties1'
                },
                {
                    id: 10002,
                    name: 'SubProperties2'
                },
                // {
                //     id: 10003,
                //     name: Languages.SubProperties3
                // },
                {
                    id: 10003,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 11,
            name: 'Job',
            icon: Images.Job,
            subCategory:[
                {
                    id: 11001,
                    name: 'Subjob1'
                },
                {
                    id: 11002,
                    name: 'Subjob2'
                },
                {
                    id: 11003,
                    name: 'Subjob3'
                },
                {
                    id: 11004,
                    name: 'Subjob4'
                },
                {
                    id: 11005,
                    name: 'Subjob5'
                },
                {
                    id: 11006,
                    name: 'Subjob6'
                },
                {
                    id: 11007,
                    name: 'Subjob7'
                },
                {
                    id: 11008,
                    name: 'Subjob8'
                },
                {
                    id: 11009,
                    name: 'Subjob9'
                },
                {
                    id: 11010,
                    name: 'Subjob10'
                },
                {
                    id: 11011,
                    name: 'Subjob11'
                },
                {
                    id: 11012,
                    name: 'Subjob12'
                },
                {
                    id: 11013,
                    name: 'Subjob13'
                },
                {
                    id: 11014,
                    name: 'Subjob14'
                },
                {
                    id: 11015,
                    name: 'Subjob15'
                },
                {
                    id: 11016,
                    name: 'Subjob16'
                },
                {
                    id: 11017,
                    name: 'Subjob17'
                },
                {
                    id: 11018,
                    name: 'Subjob18'
                },
                {
                    id: 11019,
                    name: 'Subjob19'
                },
                {
                    id: 11020,
                    name: 'Subjob20'
                },
                {
                    id: 11021,
                    name: 'Subjob21'
                },
                {
                    id: 11022,
                    name: 'Subjob22'
                },
                {
                    id: 11023,
                    name: 'Subjob23'
                },
                {
                    id: 11024,
                    name: 'Others'
                },
                {
                    id: 16,
                    name: 'ViewAll'
                },
            ]
        },
        {
            id: 12,
            name: 'FreeGiveaway',
            icon: Images.Contribution,
            subCategory:[
                {
                    id: 12001,
                    name: 'SubContribution1'
                },
                {
                    id: 12002,
                    name: 'SubContribution2'
                },
                {
                    id: 12003,
                    name: 'SubContribution3',                    
                },
                {
                    id: 12004,
                    name: 'SubContribution4'
                },
            ]
        }
    ],
    BloodGroups1: [
        {
            id: 120031,
            name: 'BloodGroup1',
        },
        {
            id: 120032,
            name: 'BloodGroup2',
        },
        {
            id: 120033,
            name: 'BloodGroup3',
        },
        {
            id: 120034,
            name: 'BloodGroup4',
        },
    ],
    BloodGroups2: [        
        {
            id: 120035,
            name: 'BloodGroup5',
        },
        {
            id: 120036,
            name: 'BloodGroup6',
        },
        {
            id: 120037,
            name: 'BloodGroup7',
        },
        {
            id: 120038,
            name: 'BloodGroup8',
        },
    ],
    SearchResult: [
        {
            id: 1,
            name: Languages.ItemName,
            price: 25000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo,
            image: Images.Automobile,
            categoryId: 6
        },
        {
            id: 2,
            name: Languages.ItemName1,
            price: 48000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo1,
            image: Images.Agriculture,
            categoryId: 2
        },
        {
            id: 3,
            name: Languages.ItemName,
            price: 25000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo,
            image: Images.Electronics,
            categoryId: 5
        },
        {
            id: 4,
            name: Languages.ItemName1,
            price: 25000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo1,
            image: Images.Gadget,
            categoryId: 4
        },
        {
            id: 5,
            name: Languages.ItemName,
            price: 25000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo,
            image: Images.House,
            categoryId: 1
        },
        {
            id: 6,
            name: Languages.ItemName,
            price: 25000,
            location: Languages.ItemLocation,
            pubdate: Languages.PublishDate,
            info: Languages.ItemInfo,
            image: Images.House,
            categoryId: 3
        }
    ],
    DefaultCurrency: {
        symbol: "₹",
        name: "Indian Rupee",
        code: 'INR',
        name_plural: "Indian Rupee",
        decimal: '.',
        thousand: ',',
        precision: 2,
        format: '%s%v'
    },
    ProfileItems: [
        {
            id: 1,
            name: Languages.Settings,
            route: 'SettingScreen',
            items: [
                {
                    id: 1,
                    name: 'Notification'
                },
                {
                    id: 2,
                    name: 'SelectLanguage'
                },
                {
                    id: 3,
                    name: 'Privacy'
                },
                {
                    id: 4,
                    name: 'Deactivate'
                },
                {
                    id: 5,
                    name: 'Logout'
                }
            ]
        },
        {
            id: 2,
            name: Languages.Support,
            route: 'SettingScreen' 
        },
        {
            id: 3,
            name: Languages.Favourites,
            route: 'FavouriteScreen'
        },
        {
            id: 4,
            name: Languages.Share,
            route: 'SettingScreen'             
        },
        {
            id: 5,
            name: Languages.ChangePassword,
            route: 'ChangePasswordScreen'             
        },
        /*{
            id: 6,
            name: Languages.Policy,
            route: 'SettingScreen'             
        },*/
    ],
    CusRating: [
        {
            id: 1,
            rating: 4,
            count: 5
        },
        {
            id: 2,
            rating: 3,
            count: 4
        },
        {
            id: 3,
            rating: 2,
            count: 3
        },
        {
            id: 4,
            rating: 1,
            count: 2
        }
    ],
    FilterOptions1: [
        {
            id: 1,
            option: 'PriceHigh'
        },
        {
            id: 2,
            option: 'PriceLow'
        }
    ],
    FilterOptions2: [
        {
            id: 3,
            option: 'Related'
        },
        {
            id: 4,
            option: 'Date'
        },
        {
            id: 5,
            option: 'Distance'
        }
    ],
    FilterOptionsDate: [       
        {
            id: 4,
            option: 'Date'
        },        
    ],
    PostedList: [
        {
            id: 1,
            option: 'Owner'
        },
        {
            id: 2,
            option: 'Agent'
        }
    ],
    ConditionList: [
        {
            id: 1,
            option: 'Old'
        },
        {
            id: 2,
            option: 'New'
        }
    ],
    FuelType: [
        {
            id: 1,
            option: 'Petrol'
        },
        {
            id: 2,
            option: 'Diesel'
        },
        {
            id: 3,
            option: 'LPG'
        },
        {
            id: 4,
            option: 'Electric'
        }
    ],
    TypeList: [
        {
            id: 1,
            option: 'Manual'
        },
        {
            id: 2,
            option: 'Automatic'
        }
    ],
    SaleType: [
        {
            id: 1,
            option: 'Sale'
        },
        {
            id: 2,
            option: 'Rent'
        }
    ],
    OwnerType: [
        {
            id: 1,
            option: 'Single'
        },
        {
            id: 2,
            option: 'Second'
        },
        {
            id: 3,
            option: 'Third'
        }
    ],
        
};
export default Constants;