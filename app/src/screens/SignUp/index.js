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

import authService from '../../services/authService';

import PersonIcon from '../../assets/images/person.svg';
import EmailIcon from '../../assets/images/email.svg';
import LockIcon from '../../assets/images/lock.svg';

export default () => {

    //const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = async () => {

        if (firstName && lastName && email && password) {

            await authService.signUp(firstName, lastName, email, password)
                .then(response => {
                    if (response && response.status === 200) {
                        console.log(response);
                         navigation.reset({
                             routes: [{ name: 'SignIn' }]
                        });
                    } else {
                        alert("ERROR");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                ;
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
                    onChangeText={e => setFirstName(e)}
                />
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="LastName"
                    value={lastName}
                    onChangeText={e => setLastName(e)}
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
                    onChangeText={e => setPassword(e)}
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
