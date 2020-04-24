import styled from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 60px;
  background: #232129;
  border-radius: 10px;

  padding: 0 16px;
  margin-bottom: 8px;
`;

export const Icon = styled(FeatherIcon).attrs({
  size: 20,
})`
  color: #666360;
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
