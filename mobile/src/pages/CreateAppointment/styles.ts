import styled from 'styled-components/native';

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
