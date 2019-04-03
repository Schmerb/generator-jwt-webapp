import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import AsideSlider from 'components/AsideSlider';
import CloseIcon from 'components/icons/CloseIcon';
import IconButton from 'components/atoms/IconButton';

import { colors } from 'utils/theme';
import useClearTimeout from 'utils/hooks/useClearTimeout';

import {
  showModal,
  closeModal,
  closeMenu,
  showChangePasswordModal,
} from 'actions/display';
import { clearUserState } from 'actions/user';

import { deleteUser } from 'utils/http/user';

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
              }, 500);
            }
          })
          .catch(err => {
            console.log({ err });
          });
      },
      onCancel: () => {
        // optional callback
        // modal will close itself eitherway
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
          <ul>
            <li>
              <a onClick={handleChangePassword} href="/change-password">
                Change My Password
              </a>
            </li>
            <li>
              <a onClick={openAccountSettings} href="/account-settings">
                Account Settings
              </a>
            </li>
          </ul>
          <h3 style={{ color: 'red' }}>Dangerous!</h3>
          <ul>
            <li>
              <a onClick={openDeleteAccount} href="#!">
                Delete Account
              </a>
            </li>
          </ul>
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
