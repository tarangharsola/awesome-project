{"import { useState, useEffect } from 'react';

interface useEditorProps {
  editor: any;
}

const useEditor = ({ editor }: useEditorProps) => {
  const [state, setState] = useState({} as any);
  const [dispatch, setDispatch] = useState({} as any);
  // ... implementation ...
}

export default useEditor;