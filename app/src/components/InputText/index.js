import React from 'react';

import {
  InputArea,
  Input
} from './styles';

export default ({ IconSvg, placeholderText, placeholderTextColor = "#268596", value, onChangeText, password }) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#268596" />
      <Input
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
