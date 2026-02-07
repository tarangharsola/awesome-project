{"import React from 'react';
import { useEditor } from './useEditor';

interface Props {}

const Editor = () => {
  const { value, onChange } = useEditor();
  return (
    <textarea value={value} onChange={onChange} />
  );
}

export default Editor;