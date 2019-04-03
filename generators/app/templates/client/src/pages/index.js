import React from 'react';
import PropTypes from 'prop-types';

import useResize from 'utils/hooks/useResize';

const Index = props => {
  const { width, height } = useResize();
  console.log({ width, height });
  console.log('Home Page');

  return (
    <div>
      <h2>Welcome!</h2>
    </div>
  );
};

Index.propTypes = {};

export default Index;
