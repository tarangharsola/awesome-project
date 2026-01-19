{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface useReconnectionProps {
  editor: any;
}

const useReconnection = ({ editor }: useReconnectionProps) => {
  const { state, dispatch } = useEditor(editor);
  // ... implementation ...
}

export default useReconnection;