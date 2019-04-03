import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import CloseIcon from 'components/icons/CloseIcon';
import IconButton from 'components/atoms/IconButton';

import { colors } from 'utils/theme';

const AsideSlider = ({ menuIsOpen, onRequestClose, renderMenu }) => {
  return (
    <Container menuIsOpen={menuIsOpen}>
      <IconButton
        style={{ alignSelf: 'flex-end' }}
        SvgComponent={CloseIcon}
        svgWidth="30px"
        svgFill={colors.Primary}
        svgHoverFill="grey"
        onClick={onRequestClose}
      />
      <MenuContent>{renderMenu()}</MenuContent>
    </Container>
  );
};

AsideSlider.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  renderMenu: PropTypes.func.isRequired,
};

export default AsideSlider;

const distance = '-320px';

const Container = styled.div`
  position: fixed;
  top: 80px;
  top: 0;
  right: ${distance};
  background-color: ${({ theme }) => theme.colors.Secondary};
  background-color: #fff;
  color: ${({ theme }) => theme.colors.Primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 300px;
  height: 100vh;
  padding: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  z-index: 10;
  transition: transform 0.5s, box-shadow 0.5s;
  box-shadow: -2px 5px 20px rgba(0, 0, 0, 0.3);

  ${({ menuIsOpen }) =>
    menuIsOpen &&
    css`
      transform: translateX(${distance});
    `}
`;

const MenuContent = styled.div`
  /* border: 1px solid green; */
`;
