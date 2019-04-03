import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import CloseIcon from 'components/icons/CloseIcon';
import IconButton from 'components/atoms/IconButton';
import Spinner from 'components/Spinner';

import { SizeTypes } from 'utils/propTypes';

const Modal = ({
  children,
  isOpen,
  onRequestClose,
  width,
  height,
  maxHeight,
  maxWidth,
  containerStyles,
  modalStyles,
  renderLabel,
  clickOutsideClose = true,
  loading = false,
  loadingText = '',
}) => {
  return (
    <Container
      isOpen={isOpen}
      onClick={evt => clickOutsideClose && onRequestClose()}
      style={containerStyles}
    >
      <ModalWrapper
        style={modalStyles}
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onClick={evt => evt.stopPropagation()}
      >
        <Spinner cover loading={loading} loadingText={loadingText} />

        <Header>
          {renderLabel && renderLabel()}
          <IconButton
            style={{
              position: 'absolute',
              top: '16px',
              right: '10px',
            }}
            onClick={onRequestClose}
            SvgComponent={CloseIcon}
            svgWidth="30px"
            svgFill="cornflowerblue"
            svgHoverFill="grey"
          />
        </Header>
        <Content>{children}</Content>
      </ModalWrapper>
    </Container>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  clickOutsideClose: PropTypes.bool,
  renderLabel: PropTypes.func,
  children: PropTypes.any,
  width: SizeTypes,
  height: SizeTypes,
  maxHeight: SizeTypes,
  maxWidth: SizeTypes,
  containerStyles: PropTypes.object,
  modalStyles: PropTypes.object,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default Modal;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s ease 0.3s;
  z-index: 20;

  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease 0.3s, visibility 0.3s;
    `}
`;

const grow = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  ${grow}
  position: relative;
  background-color: #fff;
  width: ${({ width }) => width || '75%'};
  height: ${({ height }) => height || '55%'};
  max-width: ${({ maxWidth }) => maxWidth || '500px'};
  max-height: ${({ maxHeight }) => maxHeight || '500px'};
  padding: 15px;
  border-radius: 3px;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */

  ${({ theme }) => theme.styles.boxShadows[1]}
`;

const Header = styled.div`
  height: 40px;
`;
const Content = styled.div`
  ${grow}
`;
