import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from 'utils/theme';
import {
  Checkbox as CheckboxIcon,
  CheckboxChecked,
} from 'components/icons/Checkbox';
import Checkmark from 'components/icons/Checkmark';

class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.initialValue || false,
    };
  }

  handleChange = e => {
    const { checked } = e.target;
    this.setState({ checked });
    const { onChange } = this.props;
    onChange && onChange(checked);
  };

  render() {
    const { checked } = this.state;
    const {
      outline,
      style,
      width,
      label,
      visible,
      fill,
      emptyFill,
      CustomLabel,
    } = this.props;
    const IconComponent = checked
      ? CheckboxChecked
      : outline
      ? Checkmark
      : CheckboxIcon;

    let labelComponent;
    if (CustomLabel) {
      labelComponent = <CustomLabel />;
    } else if (label) {
      labelComponent = <span>{label}</span>;
    }

    const getsOutline = outline && !checked;

    let _fill = fill;
    if (getsOutline) {
      _fill = 'transparent';
    }

    return (
      <Container visible={visible} style={style}>
        <Input
          id="customCheckbox"
          type="checkbox"
          onChange={this.handleChange}
        />
        <Label htmlFor="customCheckbox">
          <div>
            <IconComponent
              style={{ float: 'left', marginRight: '10px' }}
              width={width || 20}
              fill={_fill}
            />
          </div>
          {labelComponent}
        </Label>
      </Container>
    );
  }
}

Checkbox.propTypes = {
  initialValue: PropTypes.bool,
  visible: PropTypes.bool,
  fill: PropTypes.string,
  emptyFill: PropTypes.string, // optional fill when checkbox is not checked
  label: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  CustomLabel: PropTypes.func,
  outline: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Checkbox;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  opacity: 1;

  ${({ visible }) =>
    !visible &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const Input = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.Gray};
  font-size: 0.8rem;
  margin-left: 5px;
  cursor: pointer;
`;
