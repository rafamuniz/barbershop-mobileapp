import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import MainTab from '../screens/MainTab';

const Stack = createStackNavigator();

export default () => {    
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Preload" component={Preload} {...this.props} />
            <Stack.Screen name="SignIn" component={SignIn} {...this.props} />
            <Stack.Screen name="SignUp" component={SignUp} {...this.props} />
            <Stack.Screen name="MainTab" component={MainTab} {...this.props} />
        </Stack.Navigator>
    );
}