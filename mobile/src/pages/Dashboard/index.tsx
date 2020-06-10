import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadingProviders(): Promise<void> {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadingProviders();
  }, []);

  const navigateToProfile = useCallback(() => navigate('Profile'), [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatarUrl }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
