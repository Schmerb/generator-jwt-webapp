import React from 'react';
import PropTypes from 'prop-types';

const Exclamation = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
  >
    <path
      fill={fill}
      d="M596.3 659.9H427.7l20 20-5.1-58.8c-4.1-47.2-8.2-94.4-12.2-141.7-4.9-57-9.8-113.9-14.8-170.9-4.3-49.3-8.5-98.7-12.8-148-2.1-23.8-3.2-47.8-6.2-71.5 0-.3-.1-.6-.1-1l-20 20h270.9l-20-20-5.1 58.8c-4.1 47.2-8.2 94.4-12.2 141.7-4.9 57-9.8 113.9-14.8 170.9-4.3 49.3-8.5 98.7-12.8 148-2.1 23.8-5 47.7-6.2 71.5 0 .3-.1.6-.1 1-.9 10.5 9.8 20.5 20 20 11.6-.5 19-8.8 20-20l5.1-58.8c4.1-47.2 8.2-94.4 12.2-141.7 4.9-57 9.8-113.9 14.8-170.9 4.3-49.3 8.5-98.7 12.8-148 2.1-23.8 5-47.7 6.2-71.5 0-.3.1-.6.1-1 .9-10.8-9.9-20-20-20H376.5c-10.1 0-20.9 9.2-20 20l5.1 58.8c4.1 47.2 8.2 94.4 12.2 141.7 4.9 57 9.8 113.9 14.8 170.9 4.3 49.3 8.5 98.7 12.8 148 2.1 23.8 3.9 47.7 6.2 71.5 0 .3.1.6.1 1 .9 10.8 8.4 20 20 20h168.6c10.5 0 20.5-9.2 20-20s-8.8-20-20-20zM596.3 916H427.7l20 20V788.5v-21.1l-20 20h168.6l-20-20V936c0 10.5 9.2 20.5 20 20s20-8.8 20-20V788.5v-21.1c0-10.8-9.2-20-20-20H427.7c-10.8 0-20 9.2-20 20V936c0 10.8 9.2 20 20 20h168.6c10.5 0 20.5-9.2 20-20-.5-10.9-8.8-20-20-20z"
    />
  </svg>
);

export const ExclamationFilled = ({ fill, width = '100%', style = {} }) => (
  <svg
    style={style}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
  >
    <path
      fill={fill}
      d="M40.727 4.313A1 1 0 0 0 40 4H24a1 1 0 0 0-.999 1.056l2 36A1 1 0 0 0 26 42h12a1 1 0 0 0 .999-.944l2-36a1 1 0 0 0-.272-.743zM38 46H26a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V47a1 1 0 0 0-1-1z"
    />
  </svg>
);
const SVGPropTypes = {
  fill: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Exclamation.propTypes = SVGPropTypes;
ExclamationFilled.propTypes = SVGPropTypes;

export default Exclamation;
