import PropTypes from 'prop-types';

export const SizeTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const SVGPropTypes = {
  fill: PropTypes.string,
  style: PropTypes.object,
  width: SizeTypes,
};

export const flashMessageTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string,
  options: PropTypes.object,
};
