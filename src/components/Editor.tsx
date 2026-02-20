{"import React from 'react';
import { useEditor } from './useEditor';

const Editor = () => {
  const { language, code, editor, setLanguage, setCode, setEditor } = useEditor();

  return (
    <div>
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <textarea value={code} onChange={(event) => setCode(event.target.value)}></textarea>
      <MonacoEditor
        language={language}
        value={code}
        onChange={(event) => setCode(event)}
        onMount={(editor) => setEditor(editor)}
      />
    </div>
  );
};

export default Editor;