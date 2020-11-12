
const BASE_URL = 'https://barbershop.au.auth0.com';
import Auth0 from 'react-native-auth0';

import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";

const auth0 = new Auth0({
    domain: 'barbershop.au.auth0.com',
    clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI',
});

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

       return auth0.auth
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
            "name": name,
            "nickname": firstname,
            "connection": "Username-Password-Authentication",
            "password": password,
            "verify_email": true,
            "username": email
        }

        const req = await fetch(`${BASE_API}/dbconnections/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userData })
        });
        const json = await req.json();
        return json;
    },

    logout: async () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert(
                    'Logged out!'
                );
                this.setState({ accessToken: null });
            })
            .catch(error => {
                console.log('Log out cancelled');
            });
    },

    getUserProfile: async (token) => {
        auth0.auth
            .userInfo({ token: token })
            .then(result => console.log('user profile', result))
            .catch(console.error);
    }

};