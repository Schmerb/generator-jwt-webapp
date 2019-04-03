import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from 'utils/theme';
import { SizeTypes } from 'utils/propTypes';

const Button = memo(
  ({
    className,
    children,
    onClick,
    onMouseEnter,
    width,
    style,
    type,
    label,
    buttonBgColor,
    disabled,
  }) => (
    <StyledButton
      disabled={disabled}
      className={className}
      type={type || 'button'}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      buttonBgColor={buttonBgColor}
      width={width}
    >
      {children}
      {label}
    </StyledButton>
  ),
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.string,
  width: SizeTypes,
  buttonBgColor: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
export default Button;

const StyledButton = styled.button`
  background-color: ${({ buttonBgColor }) => buttonBgColor || colors.Primary};
  color: ${colors.Button.color};
  font-size: 0.7rem;
  text-transform: uppercase;
  border: none;
  width: ${({ width }) => width || '140px'};
  padding: 0.55rem;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s all;
  outline: none;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.75;
      pointer-events: none;
    `}

  &:hover {
    /* color: ${colors.Button.hover}; */
    opacity: 0.75;
  }
  &:active {
    color: ${colors.Button.active};
  }
`;
