import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Input: React.FC<InputProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Input;
