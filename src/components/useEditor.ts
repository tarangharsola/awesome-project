{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface useEditorProps {
  roomId: string;
}

const useEditor = ({ roomId }) => {
  const [operations, setOperations] = useState([]);
  const [cursors, setCursors] = useState({});
  useEffect(() => {
    // implement editor logic here
  }, []);
  return { operations, cursors);
};

export default useEditor;