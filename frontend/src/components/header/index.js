import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Notifications from '~/components/notifications';

import logo from '~/assets/logo-header.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const { name, avatar } = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="GoBarber"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
