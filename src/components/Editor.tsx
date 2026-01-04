{"import React from 'react';
import CodeMirror from 'codemirror';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: Props) => {
  const [cm, setCodeMirror] = React.useState(CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
    mode: language,
    lineNumbers: true,
    theme: 'monokai',
  }));

  React.useEffect(() => {
    cm.setValue(value);
    cm.on('change', (instance, changes) => {
      onChange(instance.getValue());
    });
  }, [value, onChange]);

  return (
    <div className="editor">
      <textarea id="editor" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
      <div className="toolbar">
        <select value={language} onChange={(e) => setCodeMirror(CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
          mode: e.target.value,
          lineNumbers: true,
          theme: 'monokai',
        }))}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
        </select>
        <button onClick={() => cm.execCommand('formatCode')}>Format</button>
      </div>
    </div>
  );
};

export default Editor;