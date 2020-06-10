import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Provider } from './index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
  background: ${({ theme }) => theme.colors.backgroundDark};
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};
  opacity: 0.8;

  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.active};
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)``;

// export const ProvidersList = styled(FlatList)<Provider>``;
