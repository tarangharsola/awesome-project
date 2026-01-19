{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface useCursorProps {
  editor: any;
}

const useCursor = ({ editor }: useCursorProps) => {
  const [cursor, setCursor] = useState({} as any);
  const [reconnection, setReconnection] = useState({} as any);
  const [users, setUsers] = useState({} as any);
  // ... implementation ...
}

export default useCursor;