import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
}

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();

  const route = useRoute();

  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSeletectedProvier] = useState(
    routeParams.providerId,
  );

  const { user } = useAuth();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    async function loadingProviders(): Promise<void> {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadingProviders();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item }) => (
            <ProviderContainer
              selected={selectedProvider === item.id}
              onPress={() => setSeletectedProvier(item.id)}
            >
              <ProviderAvatar source={{ uri: item.avatarUrl }} />
              <ProviderName selected={selectedProvider === item.id}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
