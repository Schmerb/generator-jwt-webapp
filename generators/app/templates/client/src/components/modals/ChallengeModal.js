import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from 'components/modals/';
import Button from 'components/atoms/Button';

import { closeModal } from 'actions/display';

const ChallengeModal = ({
  closeThis,
  renderPrompt,
  isOpen,
  onSuccess,
  onCancel,
  loading = false,
  loadingText = 'Loading..',
  onRequestClose,
}) => {
  const handleCancel = evt => {
    onCancel();
    closeThis();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      loading={loading}
      loadingText={loadingText}
      maxWidth="400px"
      maxHeight="260px"
    >
      <Container>
        <Flex>{renderPrompt && renderPrompt()}</Flex>
        <Controls>
          <Button width="45%" onClick={handleCancel}>
            Cancel
          </Button>
          <Button width="45%" onClick={onSuccess}>
            OK
          </Button>
        </Controls>
      </Container>
    </Modal>
  );
};

ChallengeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  renderPrompt: PropTypes.func,
  closeThis: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  closeThis: () => dispatch(closeModal()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ChallengeModal);

const Container = styled.div`
  color: ${({ theme }) => theme.colors.Primary};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  a {
    text-decoration: none;
  }
`;

const Flex = styled.div`
  ${({ theme }) => theme.styles.grow};
  ${({ theme }) => theme.styles.middle};
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;
