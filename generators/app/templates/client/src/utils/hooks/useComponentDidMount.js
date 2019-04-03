import { useEffect } from 'react';

// useComponentDidMount
export default fn => {
  useEffect(() => {
    fn();
  }, []);
};
