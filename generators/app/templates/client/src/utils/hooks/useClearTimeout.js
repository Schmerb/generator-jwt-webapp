import { useEffect } from 'react';

// useClearTimeout
export default timeout => useEffect(() => () => clearTimeout(timeout));
