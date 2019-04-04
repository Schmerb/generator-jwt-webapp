import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import AsideSlider from 'components/AsideSlider';

import useClearTimeout from 'utils/hooks/useClearTimeout';

import {
  showModal,
  closeModal,
  closeMenu,
  showChangePasswordModal,
} from 'actions/display';
import { clearUserState, deleteUser } from 'actions/user';
import { flashSuccess, flashError } from 'actions/flashMessage';

const Aside = props => {
  const { dispatch } = props;

  let timeout;
  useClearTimeout(timeout);

  const handleChangePassword = evt => {
    evt.preventDefault();
    dispatch(showChangePasswordModal());
    dispatch(closeMenu());
  };
  const openAccountSettings = evt => {
    evt.preventDefault();
    dispatch(closeMenu());
  };
  const openDeleteAccount = evt => {
    evt.preventDefault();
    // open up challengeModal
    const modal = {
      onSuccess: () => {
        // send action to delete account
        dispatch(deleteUser())
          .then(isSuccess => {
            if (isSuccess) {
              dispatch(clearUserState());
              timeout = setTimeout(() => {
                dispatch(closeModal());
                dispatch(flashSuccess('User successfully deleted!'));
              }, 500);
            }
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log({ err });
            dispatch(flashError());
          });
      },
      onCancel: () => {
        // optional callback
        // modal will close itself eitherway
        // eslint-disable-next-line
        console.log('onCancel');
      },
      renderPrompt: () => (
        <div style={{ textAlign: 'center' }}>
          <p>Are you sure you want to delete this account?</p>
          <p>
            This action is <span style={{ color: 'red' }}>PERMANENT</span>.
          </p>
        </div>
      ),
    };
    dispatch(closeMenu());
    dispatch(showModal(true, modal));
  };
  return (
    <AsideSlider
      {...props}
      renderMenu={() => (
        <>
          <List>
            <Item>
              <a onClick={handleChangePassword} href="/change-password">
                Change My Password
              </a>
            </Item>
            <Item>
              <a onClick={openAccountSettings} href="/account-settings">
                Account Settings
              </a>
            </Item>
          </List>
          <h3 style={{ color: 'red' }}>Dangerous!</h3>
          <List>
            <Item>
              <a onClick={openDeleteAccount} href="#!">
                Delete Account
              </a>
            </Item>
          </List>
        </>
      )}
    />
  );
};

Aside.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ display }) => {
  const { menuIsOpen } = display;
  return {
    menuIsOpen,
  };
};
export default connect(mapStateToProps)(Aside);

const List = styled.ul`
  list-style: none;
`;
const Item = styled.li`
  &:hover {
    a {
      color: ${({ theme }) => theme.colors.Compliment};
    }
  }
  a {
    color: ${({ theme }) => theme.colors.Primary};
    display: inline-block;
    width: 100%;
    line-height: 1.6rem;
    text-decoration: none;
    transition: color 0.3s;
  }
`;
