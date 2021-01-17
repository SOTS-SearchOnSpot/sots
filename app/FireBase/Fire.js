import React from 'react';
import {Constants} from '@common';
import firebase from './Config';

class Fire {
    constructor(){      
    }

    init = async () => {
        if(!firebase.apps.length){
            firebase.initializeApp(Constants.FireConfig)
        }

    }

    loginRequest = async (email, password) => {
        try{
            return await firebase.auth().signInWithEmailAndPassword(email, password);
        }catch(e){
            return (e);
        }
    }

    signUpRequest = async (email, password) => {
        try{
            return await firebase.auth().createUserWithEmailAndPassword(email, password);
        }catch(e){
            return (e);
        }
    }

    logoutRequest = async () => {
        try{
            return await firebase.auth().signOut();
        }catch(e){
            return (e);
        }
    }

    addUser = async (email, name, uid) => {
        try{
            return await firebase
            .database()
            .ref("users/" + uid)
            .set({
                name: name,
                email: email,
                uuid: uid
            })
        }catch(e){
            return(e);
        }
    }

    getUser = async (id) => {
        try{
            let users = [];
            let currentUser = {
                name: '',
                email: '',
                uuid: '',
                img: ''
            }
            firebase
            .database()
            .ref('users')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    if(id == child.val().uuid){
                        currentUser.name = child.val().name,
                        currentUser.email = child.val().email,
                        currentUser.uuid = child.val().uuid,
                        currentUser.img = ''
                    }else {
                        users.push({
                            name: child.val().name,
                            email: child.val().email,
                            uuid: child.val().uuid,
                            img: ''
                        });
                    }
                })

            }) 
            return {users, currentUser};
        }catch(err){
            return err
        }
    }

    getUid = () => {
        return firebase.auth().currentUser.uid
    }

    authCurrentUser = () => {
        return firebase.auth().currentUser;
    }

    send = async (msg, cuid, guid) => {
        try{
            return await firebase
            .database()
            .ref('messages/' + cuid)
            .child(guid)
            .push({
                message: {
                    sender: cuid,
                    reciever: guid,
                    msg: msg
                }
            })
        }catch(e){
            return(e);
        }
    }

    recieve = async (msg, cuid, guid) => {
        try{
            return await firebase
            .database()
            .ref('messages/' + guid)
            .child(cuid)
            .push({
                message: {
                    sender: cuid,
                    reciever: guid,
                    msg: msg
                }
            })
        }catch(e){
            return(e);
        }
    }

}
export default new Fire();