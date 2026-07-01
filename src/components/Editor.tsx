{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/searchscrolledcontents';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog-ext';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/anchor';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/selection/selected';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/improved-selection';
import 'codemirror/addon/scroll/searchcursor';
import 'codemirror/addon/undo/undo';
import 'codemirror/addon/undo/redo';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/searchscrolledcontents';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog-ext';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/anchor';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/selection/selected';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/improved-selection';
import 'codemirror/addon/scroll/searchcursor';
import 'codemirror/addon/undo/undo';
import 'codemirror/addon/undo/redo';

const Editor = ({ language, code, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [cursorColor, setCursorColor] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));

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
    });
    cm.on('change', () => {
      onChange(cm.getValue());
    });
    return () => {
      cm.toTextArea();
    };
  }, []);

  const handleCursorChange = (cursorPosition) => {
    setCursorPosition(cursorPosition);
  };

  return (
    <div>
      <textarea id='editor' value={code} onChange={(event) => onChange(event.target.value)} />
      <div>
        <span style={{
          position: 'absolute',
          left: cursorPosition.ch + 'px',
          top: cursorPosition.line * 20 + 'px',
          backgroundColor: cursorColor,
          width: '2px',
          height: '10px'
        }} />
      </div>
    </div>
  );
};

export default Editor;