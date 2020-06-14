import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;

  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;

  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;

  align-self: center;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 16px;
`;

export const SignOutButton = styled(Button)`
  background: #b24444;
  margin-bottom: 32px;

  height: 48px;
`;
