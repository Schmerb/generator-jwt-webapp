import { useEffect } from 'react';

export default (condition, to, router) =>
  useEffect(() => {
    if (condition) {
      // eslint-disable-next-line
      console.log(`routing from ${router.pathname} to ${to}...`);
      router.push(to);
    }
  });
