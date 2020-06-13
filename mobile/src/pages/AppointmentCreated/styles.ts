import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;

  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Rrgular';
  font-size: 18px;

  margin-top: 16px;
  text-align: center;
`;

export const OkButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.active};
  border-radius: 10px;
  padding: 12px 24px;
  margin-top: 24px;
`;

export const OkButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryBackground};
  font-family: 'RobotoSlab-Rrgular';
  font-size: 18px;
`;
