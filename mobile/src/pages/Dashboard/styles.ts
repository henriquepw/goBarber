import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
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

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  background: #3e3b47;
  border-radius: 10px;

  padding: 20px;
  margin-bottom: 16px;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Medium';

  margin-left: 8px;
  color: #999591;
`;

export const ProvidersListTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;

  margin-bottom: 24px;
`;
