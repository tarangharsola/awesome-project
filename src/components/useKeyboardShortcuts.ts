{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({});
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('shortcuts', (data) => setShortcuts(data));
  }, []);

  return { shortcuts, updateShortcuts: (shortcuts) => send('shortcuts', shortcuts) };
};

export default useKeyboardShortcuts;