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

import Logo from '../../components/Logo';
import Loading from '../../components/Loading';

import { UserContext } from '../../contexts/UserContext';

import AuthService from '../../services/AuthService';

import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

var credentials = require('../../../auth0-credentials');

import Auth0 from 'react-native-auth0';

export default () => {

    const auth0 = new Auth0(credentials);

    //const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = async () => {
        if (firstName && lastName && email && password) {

            let result = await AuthService.signUp(firstName, lastName, email, password);
            if (result.token) {
                console.log(json.token);
                await AsyncStorage.setItem('token', json.token);

            } else {
                alert("ERROR");
            }
        }
    }

    const handleLoginButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    return (
        <Container>
            <Logo />

            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="FirstName"
                    value={firstName}
                    onChangeText={t => setFirstName(t)}
                />
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="LastName"
                    value={lastName}
                    onChangeText={t => setLastName(t)}
                />

                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={e => setEmail(e)}
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={t => setPassword(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleLoginButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
