import React from 'react';
import { SVGPropTypes } from 'utils/propTypes';

const CloseIcon = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <path
      fill={fill}
      d="M7.969 5.91a2 2 0 0 0-1.375 3.437l40.593 40.594L6.594 90.535a2 2 0 1 0 2.812 2.812L50 52.754l40.594 40.593a2 2 0 1 0 2.812-2.812L52.812 49.94 93.406 9.347A2 2 0 0 0 91.97 5.91a2 2 0 0 0-1.375.625L50 47.128 9.406 6.535A2 2 0 0 0 7.97 5.91z"
      fillRule="evenodd"
      overflow="visible"
      color="#000"
    />
  </svg>
);

export const CloseIconAlt = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill={fill}
      d="M511.987 83.318L428.726.041l-172.71 172.712L83.29.009.013 83.288l172.742 172.743L.013 428.713 83.29 511.99l172.726-172.711 172.71 172.68 83.261-83.246-172.71-172.682z"
    />
  </svg>
);

CloseIcon.propTypes = SVGPropTypes;
CloseIconAlt.propTypes = SVGPropTypes;

export default CloseIcon;
