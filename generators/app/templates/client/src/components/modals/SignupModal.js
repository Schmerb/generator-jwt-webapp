import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import Modal from 'components/modals/';
import SignupFormik from 'components/formik/SignupFormik';
import Spinner from 'components/Spinner';
import UserIcon, { UserIconTie } from 'components/icons/UserIcon';

const SignupModal = ({ isOpen, onRequestClose }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  const doneLoading = () => {
    setLoading(false);
    setLoadingText('');
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      height="auto"
      maxHeight="1200px"
    >
      <Spinner loading={loading} loadingText={loadingText} />
      <Container>
        <Header>
          <UserIconTie width="65px" fill="cornflowerblue" />
          <h2>SIGNUP</h2>
        </Header>
        <SignupFormik
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          doneLoading={doneLoading}
        />
        <Link href="/login">
          <a href="/login">Login</a>
        </Link>
      </Container>
    </Modal>
  );
};

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SignupModal;

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
