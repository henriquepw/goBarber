import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const { id, provider, date, past, cancelable, canceled_at } = data;
  const dateParsed = useMemo(
    () =>
      formatRelative(parseISO(date), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
    [date]
  );

  return (
    <Container past={past}>
      <Left>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Info>
          <Name>{provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {cancelable && !canceled_at && (
        <TouchableOpacity onPress={() => onCancel(id)}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.object,
    }),
    date: PropTypes.string,
    past: PropTypes.bool,
    cancelable: PropTypes.bool,
    id: PropTypes.number,
    canceled_at: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
