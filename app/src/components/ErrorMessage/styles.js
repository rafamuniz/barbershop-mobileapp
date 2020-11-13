import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

const styles = StyleSheet.create({
    error: {
      color: 'red'
    }
});

export default styles;