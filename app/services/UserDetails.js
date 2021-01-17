import { Constants } from '@common';
export default {
    async getToken() {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const url = Constants.BaseUrl + Constants.GetToken;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){return undefined}
    },
    async userLogin(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.LoginUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {
                alert('catch',JSON.stringify(error));
                return undefined})
        }catch(error){
            alert('try',JSON.stringify(error));
            return undefined}
    },
    async userRegister(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.RegisterUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){return undefined}
    },
    async userProfile(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.ProfileUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){return undefined}
    },
    async editProfile(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.EditProfileUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){return undefined}
    },
    async userValidation(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.UserValidation;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async sendRating(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.SendRating;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async getRating(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.GetRating;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async contactList(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.ContactListUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async addContact(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.AddContactUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async removeContact(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.RemoveContactUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async addPlayerId(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.AddPlayerIdUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async deletePlayerId(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.DeletePlayerIdUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async getNotificationList(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.NotificationUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async deleteNotification(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.DeleteNotificationUrl;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
    async addChatUser(token, data) {
        try{
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                },
                body: data
            }
            const url = Constants.BaseUrl + Constants.AddChatUser;
            return await fetch(url, settings)
            .then(async (response) =>{
                return (await response.json());
            }).catch((error) => {return undefined})
        }catch(error){
            return undefined;
        }
    },
}