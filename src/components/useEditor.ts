{"import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function useEditor() {
  const dispatch = useDispatch();
  const { code, cursorPosition } = useSelector((state) => state.editor);

  useEffect(() => {
    dispatch({ type: 'UPDATE_CODE', payload: code });
  }, [code]);

  return { code, cursorPosition };
}

export default useEditor;