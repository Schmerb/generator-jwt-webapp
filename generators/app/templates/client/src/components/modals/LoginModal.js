import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import Spinner from 'components/Spinner';
import Modal from 'components/modals/';
import LoginFormik from 'components/formik/LoginFormik';
import UserIcon, {
  UserIconTie,
  UserIconTieLocked,
} from 'components/icons/UserIcon';

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Spinner cover loading={loading} loadingText={loadingText} />
      <Container>
        <Header>
          <UserIconTieLocked width="55px" fill="cornflowerblue" />
          <h2>LOGIN</h2>
        </Header>
        <LoginFormik setLoading={setLoading} setLoadingText={setLoadingText} />
        <Link href="/signup">
          <a href="/signup">Signup</a>
        </Link>
      </Container>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default LoginModal;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.Primary};
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  a {
    text-decoration: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  h2 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0;
    margin-left: 25px;
    padding: 0;
  }
`;
