import React from 'react';
import { SVGPropTypes } from 'utils/propTypes';

const Checkmark = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 847 847"
    fillRule="evenodd"
    clipRule="evenodd"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
  >
    <path fill={fill} d="M294 566l448-448 81 81-529 530L23 459l82-82z" />
  </svg>
);

Checkmark.propTypes = SVGPropTypes;

export default Checkmark;
