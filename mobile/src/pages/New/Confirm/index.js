import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddApointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/300/${provider.name}.png`,
          }}
        />

        <Name>{provider.time}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddApointment}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmação',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('SelectDateTime')}>
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  ),
});
