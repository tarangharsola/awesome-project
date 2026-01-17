{"import React from 'react';
import { Editor } from 'slate-react';
import { EditorProps } from 'slate-react/types';

interface EditorPropsWithLanguage extends EditorProps {
  language: string;
}

const EditorWithLanguage = ({ language, ...props }: EditorPropsWithLanguage) => {
  return (
    <Editor
      {...props}
      language={language}
    />
  );
}

export default EditorWithLanguage;