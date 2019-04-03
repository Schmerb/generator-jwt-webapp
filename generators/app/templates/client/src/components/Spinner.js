import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from 'utils/theme';
import { FoldingCube, Circle } from 'better-react-spinkit';

class Spinner extends Component {
  state = {
    opacity: this.props.noFadeIn ? 1 : 0,
  };

  timeout = null;

  componentDidMount = () => {
    const { fadeIn } = this.props;
    if (fadeIn) {
      this.timeout = setTimeout(() => {
        this.setState({ opacity: 1 });
      }, 50);
    }
  };

  componentDidUpdate = prevProps => {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      this.setState({ opacity: loading ? 1 : 0 });
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  render() {
    const { opacity } = this.state;
    const {
      loadingText,
      cover,
      SpinnerIcon = FoldingCube,
      bgOpacity,
      iconSize = 60,
      iconColor = colors.Blue,
      textColor = colors.Blue,
    } = this.props;
    const bgColor = this.props.bgColor || `rgba(0,0,0,${bgOpacity || 0.3})`;
    return (
      <SpinnerWrapper cover={cover} bgColor={bgColor} opacity={opacity}>
        <SpinnerText color={textColor}>{loadingText}...</SpinnerText>
        <SpinnerIcon color={iconColor} size={iconSize} />
      </SpinnerWrapper>
    );
  }
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  noFadeIn: PropTypes.bool, // starts with full opacity
  fadeIn: PropTypes.bool, // fades in onDidMount
  cover: PropTypes.bool,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  SpinnerIcon: PropTypes.func,
  bgOpacity: PropTypes.number,
};

export default Spinner;

const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: ${({ opacity }) => (opacity ? 'visible' : 'hidden')};
  opacity: ${({ opacity }) => opacity};
  transition: background-color 0.3s, opacity 0.3s,
    visibility 0s linear ${({ opacity }) => (opacity ? '0s' : '0.5s')};
  z-index: 5;
  ${({ cover, bgColor }) =>
    cover
      ? css`
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${bgColor};
        `
      : css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
`;

const SpinnerText = styled.p`
  color: ${({ color }) => color};
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;
