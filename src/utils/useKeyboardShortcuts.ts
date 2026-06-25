{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useKeyboardShortcuts() {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl-Space': 'autocomplete',
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'shortcuts') {
        setShortcuts(data.shortcuts);
      }
    };
    return () => ws.close();
  }, []);

  return shortcuts;
}

export default useKeyboardShortcuts;