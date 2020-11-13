import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import MainStack from './src/stacks/MainStack';

import UserContextProvider from './src/contexts/UserContext';

import i18n from "./src/services/i18n";
//const initI18n = i18n;

export default () => {
  //const { t, i18n } = useTranslation();

  // const ReloadAppOnLanguageChange = withNamespaces('common', {
  //   bindI18n: 'languageChanged',
  //   bindStore: false,
  // })(createAppContainer(WrappedStack));

  return (
    //screenProps={{ t, i18n }}
    <UserContextProvider>
      <NavigationContainer>
        <MainStack {...this.props} />
      </NavigationContainer>
    </UserContextProvider>
  );
}