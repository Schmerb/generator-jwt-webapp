import { useEffect, useState } from 'react';

// useOnChangeWatcher
export default (value, callback) => {
  const [prevValue, setPrevValue] = useState(null);
  useEffect(() => {
    if (
      typeof value !== 'undefined' &&
      typeof prevValue !== 'undefined' &&
      value !== prevValue
    ) {
      callback();
    }
    setPrevValue(value);
  }, [value]);
};
