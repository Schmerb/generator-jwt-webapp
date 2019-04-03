import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Aside from 'components/Aside';
import ChallengeModal from 'components/modals/ChallengeModal';
import ChangePasswordModal from 'components/modals/ChangePasswordModal';
import FlashMessages from 'components/flashMessages';
import {
  setDimensions,
  closeMenu,
  resetModal,
  closeModal,
  showChangePasswordModal,
} from 'actions/display';

import { useOnChangeWatcher } from 'utils/hooks';
import useClearTimeout from 'utils/hooks/useClearTimeout';
// import useScrollTop from 'utils/hooks/useScrollTop';
import useResize from 'utils/hooks/useResize';
// import 'utils/propTypes'; // adds custom prop types (component)

require('es6-promise').polyfill();
require('fetch-everywhere');

// this will take place of any "main.css" base style files
export const MyGlobalStyle = createGlobalStyle`
  *, body, html {
    box-sizing: border-box;
  }
  body {
    /* background-color: ${props => props.theme.colors.Secondary}; */
  }
`;

const Layout = ({
  children,
  title = 'This is the default title',
  modal,
  passwordModal,
  menuIsOpen,
  dispatch,
}) => {
  const { width, height } = useResize();
  // const scrollTop = useScrollTop();
  useOnChangeWatcher(width, () => {
    // dispatch redux action
    dispatch(setDimensions(width, height));
  });
  // useOnChangeWatcher(scrollTop, () => {
  //   // dispatch redux action
  //   console.log({ scrollTop });
  // });

  let timeout = null;
  useClearTimeout(timeout);
  const handleCloseModal = () => {
    dispatch(closeModal());
    // closes modal and then resets its state
    timeout = setTimeout(() => dispatch(resetModal()), 500);
  };
  const handleClosePasswordModal = () => {
    dispatch(showChangePasswordModal(false));
    // closes modal and then resets its state
    // timeout = setTimeout(() => dispatch(resetModal()), 500);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <MyGlobalStyle />
      <Main role="main">
        <ChallengeModal
          {...modal.metaData}
          isOpen={modal.isOpen}
          onRequestClose={handleCloseModal}
        />
        <ChangePasswordModal
          isOpen={passwordModal.isOpen}
          onRequestClose={handleClosePasswordModal}
        />
        <FlashMessages />
        <Aside
          menuIsOpen={menuIsOpen}
          onRequestClose={() => dispatch(closeMenu())}
        />
        <Container>{children}</Container>
      </Main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  dispatch: PropTypes.func,
  modal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object,
  }),
  menuIsOpen: PropTypes.bool,
};

const mapStateToProps = ({ display }) => ({
  modal: display.modal,
  passwordModal: display.passwordModal,
  menuIsOpen: display.menuIsOpen,
});

export default connect(mapStateToProps)(Layout);

const Main = styled.main`
  color: #000;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px); /* relies on header/footer heights */
`;

const Container = styled.div`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 1;
`;
