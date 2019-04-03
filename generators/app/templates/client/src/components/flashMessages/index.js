import _map from 'lodash.map';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { removeFlashMessage } from 'actions/flashMessage';

import { mapRange } from 'utils/helpers';
import useScrollTop from 'utils/hooks/useScrollTop';
import { flashMessageTypes } from 'utils/propTypes';
import FlashMessage from './FlashMessage';

export const FlashMessages = ({ dispatch, messages }) => {
  const scrollTop = useScrollTop();

  const renderMessage = ({ message, messageType, options }, id) => {
    const removeMessage = () => {
      dispatch(removeFlashMessage(id));
    };

    return (
      <FlashMessage
        key={id}
        id={id}
        message={message}
        messageType={messageType}
        removeMessage={removeMessage}
        options={options}
      />
    );
  };
  renderMessage.propTypes = flashMessageTypes;

  const from = [0, 150];
  const to = [80, 0];
  const target = scrollTop;
  const output = mapRange({ from, to, target });

  return (
    <Container output={output}>
      <MessageList>
        {messages &&
          _map(messages, (message, key) => renderMessage(message, key))}
      </MessageList>
    </Container>
  );
};

FlashMessages.propTypes = {
  messages: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapstateToProps = ({ flashMessages }) => ({
  messages: flashMessages,
});
export default connect(mapstateToProps)(FlashMessages);

const Container = styled.div`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: transform 0.5s;
  z-index: 100;
  ${({ output }) => css`
    transform: translateY(${output}px);
  `}
`;

const MessageList = styled.ul`
  ${({ theme }) => theme.styles.grow}
  ${({ theme }) => theme.styles.middle}
  padding: 0;
  margin: 0;
`;
