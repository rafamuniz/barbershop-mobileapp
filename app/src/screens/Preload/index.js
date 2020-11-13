import React, { useEffect } from 'react';

import { Container, LoadingIcon } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../components/Logo';
import authService from '../../services/authService';

export default () => {

    const navigation = useNavigation();

    useEffect(() => {



        const checkToken = async () => {
            AsyncStorage.getItem('token', (error, result) => {
                if (result) {
                    // Validate Token
                    console.log(result);
                    navigation.navigate('MainTab');

                    // authService.refreshToken(result)
                    //     .then(response => {
                    //         navigation.navigate('MainTab');
                    //     })
                    //     .catch(error => {
                    //         console.log(error);

                    //     })
                } else {
                    navigation.navigate('SignIn');
                }
            });

        }

        removeToken();
        checkToken();
    }, [])

    const removeToken = async () => {
        await AsyncStorage.removeItem('token');
    }

    return (
        <Container>
            <Logo />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}