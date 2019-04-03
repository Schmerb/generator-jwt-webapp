import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconButton = memo(
  ({
    SvgComponent,
    svgWidth,
    svgFill,
    svgHoverFill,
    style,
    styledCss,
    svgStyle,
    label,
    onClick,
    disabled,
  }) => {
    return (
      <Button
        type="button"
        style={style}
        styledCss={styledCss}
        disabled={disabled}
        onClick={evt => !disabled && onClick(evt)}
        svgFill={svgFill}
        svgHoverFill={svgHoverFill}
      >
        <SvgComponent width={svgWidth} style={svgStyle} />
        {label && <span>{label}</span>}
      </Button>
    );
  },
);

IconButton.propTypes = {
  SvgComponent: PropTypes.func.isRequired,
  svgWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  svgFill: PropTypes.string,
  svgHoverFill: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.object,
  svgStyle: PropTypes.object,
  styledCss: PropTypes.any,
};

export default IconButton;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  svg {
    fill: ${({ svgFill, disabled }) =>
      disabled ? 'rgba(0,0,0,0.5)' : svgFill};
    transition: fill 0.3s;

    &:hover {
      fill: ${({ svgHoverFill }) => svgHoverFill};
    }
  }

  ${({ styledCss }) => styledCss}
`;
