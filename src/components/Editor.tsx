import React from 'react';
import { useEditor } from './useEditor';

interface Props {
  language: string;
  code: string;
}

const Editor: React.FC<Props> = ({ language, code }) => {
  const { editorRef } = useEditor(language);
  return (
    <div ref={editorRef} style={{
      width: '100%',
      height: '100vh',
      padding: 10,
      backgroundColor: '#f0f0f0',
    }}>
      {code}
    </div>
  );
};

export default Editor;