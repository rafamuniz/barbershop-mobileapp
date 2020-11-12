import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    LoadingIcon,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import SignInput from '../../components/SignInput';

import AuthService from '../../services/AuthService';

import Logo from '../../components/Logo';
import Loading from '../../components/Loading';

import { UserContext } from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import Auth0 from 'react-native-auth0';

export default () => {
    const auth0 = new Auth0({ domain: 'barbershop.au.auth0.com', clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI' });

    //const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignClick = async () => {
        // const auth0 = new Auth0({
        //     domain: 'barbershop.au.auth0.com',
        //     clientId: 'Wbxv34gRj86RTDTe7sVeXZu85QtVarwI',
        // });

        //console.log(email, password);

        // auth0.auth
        //     .passwordRealm({
        //         username: email,
        //         password: password,
        //         realm: 'Username-Password-Authentication',
        //     })
        //     .then(async (response)  => {
        //         console.log(response.accessToken);
        //         if (response.accessToken) {
        //             await AsyncStorage.setItem('token', response.accessToken);

        //             // userDispatch({
        //             //     type: 'setAvatar',
        //             //     payload: {
        //             //         avatar: json.data.avatar
        //             //     }
        //             // });

        //             navigation.reset({
        //                 routes: [{ name: 'MainTab' }]
        //             });
        //         } else {
        //             alert('E-mail e/ou senha errados!');
        //         }
        //     })
        //     .catch(console.error);

        if (email != '' && password != '') {

            await AuthService.signIn(email, password)
                .then(async (response) => {
                    if (response && response.accessToken) {
                        await AsyncStorage.setItem('token', response.accessToken);

                        console.log("TOKEN: " + await AsyncStorage.getItem('token'));
                        // userDispatch({
                        //     type: 'setAvatar',
                        //     payload: {
                        //         avatar: json.data.avatar
                        //     }
                        // });

                        navigation.reset({
                            routes: [{ name: 'MainTab' }]
                        });
                    } else {
                        alert('E-mail e/ou senha errados!1111111');
                    }
                })
                .catch((error) => {
                    console.log(JSON.stringify({ error }));
                    //console.log(error);
                    if (error.name === "invalid_grant"){
                        alert("E-mail e/ou senha errados!");
                    }

                })
                ;

            // if (accessToken) {
            //     await AsyncStorage.setItem('token', accessToken);

            //     console.log("TOKEN: " + await AsyncStorage.getItem('token'));
            //     // userDispatch({
            //     //     type: 'setAvatar',
            //     //     payload: {
            //     //         avatar: json.data.avatar
            //     //     }
            //     // });

            //     navigation.reset({
            //         routes: [{ name: 'MainTab' }]
            //     });
            // } else {
            //     alert('E-mail e/ou senha errados!');
            // }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    return (
        <Container>
            <Logo />
            <Loading />

            <InputArea>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={t => setEmail(t)}
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={t => setPassword(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
