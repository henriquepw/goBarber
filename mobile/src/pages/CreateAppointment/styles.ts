import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderProps {
  selected?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
  background: ${({ theme }) => theme.colors.backgroundDark};
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;

  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;

  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderProps>`
  flex-direction: row;
  align-items: center;

  background: ${(props) =>
    props.selected ? props.theme.colors.active : '#3e3b47'};

  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;

  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.secundaryBackground
      : props.theme.colors.secundaryText};

  font-family: 'RobotoSlab-Medium';
  font-size: 16px;

  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryText};

  font-family: 'RobotoSlab-Medium';
  font-size: 24px;

  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  align-items: center;
  justify-content: center;

  height: 46px;

  background: ${({ theme }) => theme.colors.active};
  margin: 0 24px;
  border-radius: 10px;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryBackground};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;
