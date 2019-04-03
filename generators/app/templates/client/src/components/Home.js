import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import Button from 'components/atoms/Button';
import LoginModal from 'components/modals/LoginModal';
import SignupModal from 'components/modals/SignupModal';

import { useComponentDidMount } from 'utils/hooks';

const Home = ({ tab, router, user }) => {
  const [isOpen, setIsOpen] = useState(true);

  const modalProps = {
    isOpen,
    onRequestClose: () => setIsOpen(false),
  };

  useComponentDidMount(() => {
    if (user) {
      // eslint-disable-next-line
      console.log(`routing from ${router.pathname} to /dashboard...`);
      router.push('/dashboard');
    }
  });

  const IS_LOGIN = tab === 'login';
  return (
    <Container>
      {IS_LOGIN ? (
        <LoginModal {...modalProps} />
      ) : (
        <SignupModal {...modalProps} />
      )}
      <div>
        <h2>{IS_LOGIN ? 'Login' : 'Signup'}</h2>

        <Button type="button" onClick={evt => setIsOpen(true)}>
          Open Modal
        </Button>
      </div>
    </Container>
  );
};

Home.propTypes = {
  tab: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  user: PropTypes.object,
};
const mapStateToProps = ({ user }) => ({ user });
export default withRouter(connect(mapStateToProps)(Home));

const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.Primary};
  width: 600px;
  margin: 0 auto;
  text-align: center;
`;
