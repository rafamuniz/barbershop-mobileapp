import React from 'react';
import { Text } from 'react-native';

export default ErrorMessage = ({ error }) => {
    
    if (!error) {
        return null;
    }

    return (
        <Text style={{ color: 'red' }}>{error}</Text>
    );
};