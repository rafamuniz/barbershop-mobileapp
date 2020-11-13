import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

import AsyncStorage from '@react-native-community/async-storage';

import authService from '../../services/authService';

export default () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = () => {

        AsyncStorage.getItem('token', (error, result) => {
            authService.getUserProfile(result)
                .then(response => {
                    setName(response.name);
                    setEmail(response.email);                    
                })
                .catch(error => {
                    console.log(error);

                })
                ;
        });
    }

    return (
        <Container>
            <Text>MainTab</Text>
            <Text>{name}</Text>
            <Text>{email}</Text>
        </Container>
    );
}
