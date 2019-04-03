import { useState, useEffect } from 'react';
import { useComponentDidMount, useComponentWillUnmount } from 'utils/hooks';

// useResize
export default () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  let resizeTimeout;
  let resizeThrottler;

  const setDimensions = () => {
    const { innerWidth, innerHeight } = window;
    setWidth(innerWidth);
    setHeight(innerHeight);
  };

  useEffect(() => {
    resizeThrottler = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          // The setDimensions will execute at a rate of 15fps
          setDimensions();
        }, 66);
      }
    };
  }, []);

  useComponentDidMount(() => {
    window.addEventListener('resize', resizeThrottler);
    setDimensions();
  });

  useComponentWillUnmount(() => {
    window.removeEventListener('resize', resizeThrottler);
    clearInterval(resizeTimeout);
  });

  return { width, height };
};
