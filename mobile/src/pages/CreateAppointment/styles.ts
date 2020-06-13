import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
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

export const Content = styled.ScrollView``;

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

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;

  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  border-radius: 10px;
  margin-right: 8px;

  background: ${(props) =>
    props.selected ? props.theme.colors.active : '#3e3b47'};

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.secundaryBackground : theme.colors.secundaryText};
`;

export const CreateAppointmentButton = styled(RectButton)`
  align-items: center;
  justify-content: center;

  height: 50px;

  background: ${({ theme }) => theme.colors.active};
  margin: 0 24px 24px;
  border-radius: 10px;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secundaryBackground};
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;
