import { Constants } from '@common';

const types = {
    SELECTIMAGE: 'SELECTIMAGE',
    LOGIN: 'LOGIN',
    ADDTOKEN: 'ADDTOKEN',
    LOGOUT: 'LOGOUT',
    SETINTRO: 'SETINTRO',
    FINISHINTRO: 'FINISHINTRO',
    SETLANGUAGE: 'SETLANGUAGE',
    NOTIFICATION: 'NOTIFICATION',
    SETCONTACT: 'SETCONTACT',
    SETPRIVACY: 'SETPRIVACY',
    SETPROFILE: 'SETPROFILE',
    EDITPROFILE: 'EDITPROFILE',
    REMOVEIMAGES: 'REMOVEIMAGES',
    SETLOCATION: 'SETLOCATION',
    SETLOCATIONLIST: 'SETLOCATIONLIST',
    SETCOUNT: 'SETCOUNT',
    CHATID: 'CHATID',
    SETFILTER: 'SETFILTER',
    SETPASSWORD: 'SETPASSWORD',
    SETLANGUAGEFROMSIGNUP: 'SETLANGUAGEFROMSIGNUP',
};
export const action = {
    selectImages: (images) => {
        return({type: types.SELECTIMAGE, images})
    },
    removeImages: () => {
        return({type: types.REMOVEIMAGES})
    },
    login: (user) => {
        return({type: types.LOGIN, user})
    },
    saveToken: (token) => {
        return({type: types.ADDTOKEN, token})
    },
    logout: () => {
        return({type: types.LOGOUT})
    },
    setIntro: () => {
        return({type: types.SETINTRO})
    },
    finishIntro: () => {
        return({type: types.FINISHINTRO})
    },
    setLanguage: (value) => {
        return({type: types.SETLANGUAGE, value})
    },
    setSignupLanguage: (value) => {
        return({type: types.SETLANGUAGEFROMSIGNUP, value})
    },
    setContact: (contact) => {
        return({type: types.SETCONTACT, contact})
    },
    setNotification: (notification) => {
        return({type: types.NOTIFICATION, notification})
    },
    setProfileData: (profileData) => {
        return({type: types.SETPROFILE, profileData})
    },
    setPrivacy: (privacyMobile, privacyEmail) => {        
        return({type: types.SETPRIVACY, privacyMobile, privacyEmail})
    },
    editProfile: (user, profileData) => {
        return({type: types.EDITPROFILE, user, profileData})
    },
    setLocation: (location) => {
        return({type: types.SETLOCATION, location})
    },
    setLocationList: (list) => {
        return({type: types.SETLOCATIONLIST, list})
    },
    setCount: (count) => {
        return({type: types.SETCOUNT, count})
    },
    setUID: (uid) => {
        return({type: types.CHATID, uid})
    },
    setFilterData: (data, isFilter) => {
        return({type: types.SETFILTER, data, isFilter})
    },
    setPassword: (currentPassword) => {
        return({type: types.SETPASSWORD, currentPassword})
    }

};

const initialState = {
    user: null,
    images: [],
    token: null,
    appIntro: true,
    language: Constants.Language,
    notification: true,
    contact: [],
    privacyMobile: false,
    privacyEmail: false,
    profileData: null,
    selectedLocation: "Tamilnadu",
    locations: [],
    notificationCount: 0,
    uid: null,
    filterData: null,
    isFilter: false,
    currentPassword: null
};

export const reducer = (state = initialState, action) => {
    const { type, images, user, token, value, notification, contact, privacyEmail, privacyMobile, 
        profileData, location, list, count, uid, data, isFilter, currentPassword } = action;
    switch(type){
        case types.SELECTIMAGE:
            return { ...state, images: images };
        case types.REMOVEIMAGES:
            return { ...state, images: [] };
        case types.LOGIN:
            return { ...state, user: user,
                appIntro: true, 
                notification: user.NotificationOn == 0 ? false : true };
        case types.ADDTOKEN:
            return { ...state, token: token };
        case types.LOGOUT:
            return { ...state, user: null, 
                appIntro: true, 
                uid: null };
        case types.FINISHINTRO:
            return { ...state, appIntro: false };
        case types.SETINTRO:
            return { ...state, appIntro: true };
        case types.SETLANGUAGE:
            return { ...state, language: value, appIntro: true };
        case types.SETLANGUAGEFROMSIGNUP:
            return { ...state, language: value };
        case types.SETCONTACT:
            return { ...state, contact };
        case types.NOTIFICATION:
            return { ...state, notification };
        case types.SETPROFILE:
            return { ...state, profileData };
        case types.SETPRIVACY:
            return { ...state, privacyEmail, privacyMobile };
        case types.EDITPROFILE:
            return { ...state, user, profileData };
        case types.SETLOCATION:
            return { ...state, selectedLocation: location };
        case types.SETLOCATIONLIST:
            return { ...state, locations: list };
        case types.SETCOUNT:
            return { ...state, notificationCount: count };
        case types.CHATID:
            return { ...state, uid };
        case types.SETFILTER:
            return { ...state, filterData: data, isFilter };
        case types.SETPASSWORD:
            return { ...state, currentPassword };
        default:
            return state;
    }
};