import { useEffect } from 'react';

// useComponentWillUnmount
export default fn => {
  useEffect(() => {
    return fn; // fires on didMount
  }, []);
};
