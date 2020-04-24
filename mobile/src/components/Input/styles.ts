import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 60px;
  background: #232129;

  border-radius: 10px;
  border-color: #232129;
  border-width: 2px;

  padding: 0 16px;
  margin-bottom: 8px;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Icon = styled(FeatherIcon).attrs({
  size: 20,
})<IconProps>`
  color: #666360;
  margin-right: 16px;

  ${({ isFocused, isFilled }) =>
    (isFocused || isFilled) &&
    css`
      color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
