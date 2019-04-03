import React from 'react';
import { SVGPropTypes } from 'utils/propTypes';

export const Checkbox = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <path
      fill={fill}
      width={width}
      d="M82 90H18c-4.4 0-8-3.6-8-8V18c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v64c0 4.4-3.6 8-8 8zm-7.4-56.7c-1.9-1.7-4.9-1.7-6.7 0l-25.7 0"
    />
  </svg>
);
Checkbox.propTypes = SVGPropTypes;

export const CheckboxChecked = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <path
      fill={fill}
      width={width}
      d="M82 90H18c-4.4 0-8-3.6-8-8V18c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v64c0 4.4-3.6 8-8 8zm-7.4-56.7c-1.9-1.7-4.9-1.7-6.7 0l-25.7 24-10.1-9.4c-1.9-1.7-4.9-1.7-6.7 0-1.9 1.7-1.9 4.5 0 6.3l13.4 12.5c1.9 1.7 4.9 1.7 6.7 0l29.1-27.2c1.9-1.7 1.9-4.5 0-6.2z"
    />
  </svg>
);

CheckboxChecked.propTypes = SVGPropTypes;
