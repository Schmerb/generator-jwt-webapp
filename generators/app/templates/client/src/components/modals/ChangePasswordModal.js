import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from 'components/modals/';
import ChangePasswordFormik from 'components/formik/ChangePasswordFormik';

const ChangePasswordModal = ({ isOpen, onRequestClose }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading ...');
  return (
    <Modal
      clickOutsideClose={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      loading={loading}
      loadingText={loadingText}
      maxWidth="400px"
      maxHeight="260px"
      renderLabel={() => (
        <div>
          <Title>Change Password</Title>
        </div>
      )}
    >
      <Container>
        <ChangePasswordFormik
          onRequestClose={onRequestClose}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      </Container>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.Primary};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  a {
    text-decoration: none;
  }
`;

const Flex = styled.div`
  ${({ theme }) => theme.styles.grow};
  ${({ theme }) => theme.styles.middle};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.Primary};
  margin: 0;
  padding: 0;
`;
