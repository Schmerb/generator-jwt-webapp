import { useState, useEffect } from 'react';
import { useComponentDidMount, useComponentWillUnmount } from 'utils/hooks';

// useScroll
export default () => {
  const [scrollTop, setScrollTop] = useState(0);

  let scrollTimeout;
  let scrollThrottler;

  const setDimensions = () => {
    const currentScrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    setScrollTop(currentScrollTop);
  };

  useEffect(() => {
    scrollThrottler = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          // The setDimensions will execute at a rate of 15fps
          setDimensions();
        }, 66);
      }
    };
  }, []);

  useComponentDidMount(() => {
    window.addEventListener('scroll', scrollThrottler);
    setDimensions();
  });

  useComponentWillUnmount(() => {
    window.removeEventListener('scroll', scrollThrottler);
    clearInterval(scrollTimeout);
  });

  return scrollTop;
};
