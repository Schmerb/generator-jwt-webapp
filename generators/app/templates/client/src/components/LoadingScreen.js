import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from 'utils/theme';
import {
  FoldingCube,
  Circle,
  ChasingDots,
  CubeGrid,
  WanderingCubes,
  DoubleBounce,
  RotatingPlane,
  ThreeBounce,
  Wave,
} from 'better-react-spinkit';

const LoadingScreen = ({ loaded, bgColor }) => {
  const [opacity, setOpacity] = useState(loaded ? 0 : 1);
  useEffect(() => {
    setOpacity(loaded ? 0 : 1);
  }, [loaded]);

  return (
    <Container opacity={opacity}>
      <SpinnerWrapper cover bgColor={bgColor}>
        <SpinnerText color="cornflowerblue">Loading...</SpinnerText>
        <FoldingCube color="cornflowerblue" size={70} />
      </SpinnerWrapper>
    </Container>
  );
};

LoadingScreen.propTypes = {
  loaded: PropTypes.bool.isRequired,
};
export default LoadingScreen;

const Container = styled.div`
  background-color: #fff;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 110;
  visibility: ${({ opacity }) => (opacity ? 'visible' : 'hidden')};
  opacity: ${({ opacity }) => opacity};
  transition: background-color 0.3s, opacity 0.3s,
    visibility 0s linear ${({ opacity }) => (opacity ? '0s' : '0.5s')};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
