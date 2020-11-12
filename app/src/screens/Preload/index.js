import React, { useEffect } from 'react';

import { Container, LoadingIcon } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import BarberLogo from '../../assets/barber.svg';

export default () => {

    const navigation = useNavigation();

    useEffect(() => {
        
        const removeToken = async () => {
            await AsyncStorage.removeItem('token');
        }

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // Validate Token
            } else {
                navigation.navigate('SignIn');
            }
        }
        
        removeToken();
        checkToken();
    }, [])

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}