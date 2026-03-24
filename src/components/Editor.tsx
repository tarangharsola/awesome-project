{"import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';

const Editor = ({ content, language }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [cursorColor, setCursorColor] = useState('#000000');

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai',
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      }
    });
    cm.on('cursorActivity', () => {
      setCursorPosition(cm.getCursor());
      setCursorColor(cm.getOption('cursorColor'));
    });
    return () => {
      cm.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea id='editor' value={content} readOnly={true} />
      <div>
        <span style={{ color: cursorColor }}>{cursorPosition.line + 1}:{cursorPosition.ch + 1}</span>
      </div>
    </div>
  );
};

export default Editor;