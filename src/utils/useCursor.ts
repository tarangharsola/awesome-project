{"import { useState, useEffect } from 'react';

const useCursor = () => {
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    setCursor(cursor);
  }, []);

  return { cursor };
};

export default useCursor;