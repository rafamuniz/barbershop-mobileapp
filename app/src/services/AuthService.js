import React from 'react';

import Auth0 from 'react-native-auth0';

import httpService from './httpService';

import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";

// const auth0 = new Auth0({
//     domain: Config.AUTH0_DOMAIN,
//     clientID: Config.AUTH0_CLIENT_ID,
// });

export default {

    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const json = await req.json();
        return json;
    },

    signIn: async (email, password) => {
        console.log("signIn: " + email + " - " + password);

        auth0.auth
            .passwordRealm({
                username: email,
                password: password,
                realm: "Username-Password-Authentication",
            })
            // .then((response) => {
            //     return response;

            //     //console.log("Response: " + onfulfilled.accessToken);
            //     //console.log("onrejected: " + onrejected);
            //     // if (response.accessToken) {
            //     //     console.log(response);
            //     //     return response.accessToken;
            //     // } else {
            //     //     alert('E-mail e/ou senha errados!');
            //     // }
            // })
            // .catch((error) => {
            //     //console.error
            //     console.log("Error: " + error.json());
            // }) 
            ;
    },

    signUp: async (firstname, lastname, email, password) => {

        let userData = {
            "client_id": "Wbxv34gRj86RTDTe7sVeXZu85QtVarwI",
            "email": email,
            "phone_number": "+199999999999999",
            "user_metadata": {
                "plan": "silver",
                "team_id": "a111"
            },
            "blocked": false,
            "email_verified": false,
            "phone_verified": false,
            "app_metadata": {},
            "given_name": firstname,
            "family_name": lastname,
            "name": firstname + " " + lastname,
            "nickname": firstname,
            "connection": "Username-Password-Authentication",
            "password": password,
            "verify_email": true,
            "username": email
        };

        //console.log(userData);
        //console.log(BASE_URL);        
        return httpService.post(`${Config.AUTH0_URL}/dbconnections/signup`, userData);
    },

    refreshToken: async (refreshToken) => {

        const auth0 = new Auth0({
            domain: 'barbershop.au.auth0.com',
            clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI'
        });

        return auth0.auth
            .refreshToken({ refreshToken: refreshToken });
    },

    logout: async () => {

        return auth0.auth
            .clearSession({})
    },

    getUserProfile: async (accessToken) => {

        const auth0 = new Auth0({
            domain: 'barbershop.au.auth0.com',
            clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI'
        });

        return auth0.auth
            .userInfo({ token: accessToken })
            ;
    },

    getFullUserProfile: async (accessToken) => {

        const auth0 = new Auth0({
            domain: 'barbershop.au.auth0.com',
            clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI'
        });

        return auth0  
            .users(accessToken)
            .getUser({id: "auth0|5fabccdf82d6e2006e836b8a"})
    },

    login: async () => {

        const auth0 = new Auth0({
            domain: 'barbershop.au.auth0.com',
            clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI'
        });

        return auth0
            .webAuth
            .authorize({ scope: 'openid profile email' })
            ;
    },
};