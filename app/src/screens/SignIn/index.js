import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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

import authService from '../../services/authService';

import Logo from '../../components/Logo';
import Loading from '../../components/Loading';

import { UserContext } from '../../contexts/UserContext';

import EmailIcon from '../../assets/images/email.svg';
import LockIcon from '../../assets/images/lock.svg';

import ErrorMessage from '../../components/ErrorMessage';

export default () => {

    //const { t, i18n } = props.screenProps;

    //const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignClick = async () => {

        await authService.login(email, password)
            .then(response => {
                console.log(response);
                AsyncStorage.setItem('token', response.accessToken);

                navigation.navigate('MainTab');                
            })
            .catch(error => {
                console.log(error)
            });

    }

    const handleLogoutClick = async () => {

        await authService.logout()
            .then(async (response) => {
                alert('Log out');

                AsyncStorage.removeItem('token');
            })
            .catch((error) => {
                console.log("Logout: " + error);
            })
            ;
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    return (
        <Container>
            <ErrorMessage error="wefwefewfewfewfew" />

            {/* <Text>
                {t('Hey Yo Im at home')}
            </Text> */}

            {/* <View
                style={{
                    flexDirection: 'row',
                    margin: 10,
                }}>
                <TouchableOpacity
                    onPress={() => i18n.changeLanguage('en')} //Here I change the language to "en" English
                    style={Styles.button}>
                    <Text style={{ color: '#fff' }}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => i18n.changeLanguage('es')} //Here I change the language to "es" Spanish
                    style={Styles.button}>
                    <Text style={{ color: '#fff' }}>ES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => i18n.changeLanguage('de')} //Here I change the language to "de" German
                    style={Styles.button}>
                    <Text style={{ color: '#fff' }}>DE</Text>
                </TouchableOpacity>
            </View> */}

            <Logo />
            <Loading />

            <InputArea>
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

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
                <CustomButton onPress={handleLogoutClick}>
                    <CustomButtonText>LOGOUT</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
