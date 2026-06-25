{"import { useState, useEffect } from 'react';
import { format } from 'prettier';

function useFormattingDefaults() {
  const [defaults, setDefaults] = useState({
    tabSize: 2,
    useTabs: false,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'defaults') {
        setDefaults(data.defaults);
      }
    };
    return () => ws.close();
  }, []);

  return defaults;
}

export default useFormattingDefaults;