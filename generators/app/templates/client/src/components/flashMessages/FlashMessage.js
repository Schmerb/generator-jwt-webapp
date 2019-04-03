import _capitalize from 'lodash.capitalize';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Color from 'color';

import Checkmark from 'components/icons/Checkmark';
import CloseIcon, { CloseIconAlt } from 'components/icons/CloseIcon';
import Exclamation, { ExclamationFilled } from 'components/icons/Exclamation';
import Information from 'components/icons/Information';

import { colors } from 'utils/theme';
import { useComponentDidMount } from 'utils/hooks';
import useClearTimeout from 'utils/hooks/useClearTimeout';
import { flashMessageTypes } from 'utils/propTypes';
// const {
//   system: { ERROR, SUCCESS, SUCCESS_TEXT, WARNING, GENERAL },
// } = colors;

const ANIMATION = 600; // opacity/fade animation duration (ms)
const MESSAGE_DURATION = 5000; // duration (ms) message is fully visible

const renderIcon = (fill, messageType, options) => {
  let IconComponent;
  let width = 19;

  switch (messageType) {
    case 'success':
      IconComponent = Checkmark;
      break;
    case 'error':
      IconComponent = CloseIconAlt;
      width = 15;
      break;
    case 'warning':
      IconComponent = ExclamationFilled;
      width = 18;
      break;
    case 'general':
      IconComponent = Information;
      break;
    default:
  }

  return (
    <>
      <IconWrapper>
        <IconComponent width={width} fill={fill} />
      </IconWrapper>
      {options && options.defaultLabel && (
        <Text>{_capitalize(messageType)}..</Text>
      )}
    </>
  );
};

const FlashMessage = ({ message, messageType, options, removeMessage }) => {
  const [opacity, setOpacity] = useState(0);

  let faderTimeout;
  let timeout;

  const fadeOut = () => {
    // fade message out
    setOpacity(0);
    // then remove it from state
    timeout = setTimeout(() => {
      removeMessage();
    }, ANIMATION);
  };

  useClearTimeout(timeout);
  useClearTimeout(faderTimeout);
  useComponentDidMount(() => {
    setOpacity(1);
    faderTimeout = setTimeout(fadeOut, MESSAGE_DURATION);
  });

  const TYPE = messageType.toUpperCase();
  const bgColor = colors.system[TYPE];

  const color = Color(bgColor)
    .darken(0.3)
    .string();
  const borderColor = Color(bgColor)
    .darken(0.15)
    .string();

  const marginLeft = options && options.defaultLabel ? '25px' : '0';

  return (
    <WrapperBtn
      bgColor={bgColor}
      borderColor={borderColor}
      color={color}
      opacity={opacity}
      onClick={fadeOut}
    >
      {renderIcon(color, messageType, options)}
      <Text style={{ color, marginLeft }}>{message}</Text>
    </WrapperBtn>
  );
};

FlashMessage.propTypes = {
  ...flashMessageTypes,
  removeMessage: PropTypes.func.isRequired,
};

export default FlashMessage;

const WrapperBtn = styled.li`
  ${({ theme }) => theme.styles.boxShadows[1]};

  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ opacity }) => opacity};
  border: 1px solid ${({ borderColor }) => borderColor};

  display: flex;
  align-items: center;
  height: 40px;
  width: 80%;
  max-width: 400px;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 5px;
  border: none;
  outline: none;
  pointer-events: ${({ opacity }) => (opacity ? 'all' : 'none')};
  transition: opacity ${ANIMATION}ms, background-color ${ANIMATION}ms;

  &:active {
    background-color: ${({ bgColor }) =>
      Color(bgColor)
        .lighten(0.1)
        .string()};
  }

  h2 {
    margin: 0;
    padding: 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
`;
