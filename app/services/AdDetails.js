import { Constants } from '@common';
export default {
    async createAd(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.CreateAdUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async searchLocation(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.LocationUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async getLocations(token) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            }
            const url = Constants.BaseUrl + Constants.LocationUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async getAds(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.AdDetailsUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async like(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.LikeUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async unLike(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.UnLikeUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async favourites(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.FavouriteUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async unFavourites(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.UnFavouriteUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async getOurAd(token) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'token': token
                }
            }
            const url = Constants.BaseUrl + Constants.OurImage;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async deleteAd(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.DeleteAdUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async reportAd(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.ReportAdUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async filterAds(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.FilterAdsUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
}