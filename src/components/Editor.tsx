import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/python-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchonspace';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/matchesonscreen';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog-ext';
import 'codemirror/addon/search/search';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/python-hint';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: Props) => {
  const cm = CodeMirror.fromTextArea(document.getElementById('editor')!, {
    mode: language,
    lineNumbers: true,
    theme: 'monokai',
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Shift-Space': 'show-hint',
      'Shift-Tab': 'indentLess',
      'Tab': 'indentMore',
    },
  });

  cm.on('change', (instance, change) => {
    onChange(instance.getValue());
  });

  return <div id="editor" style={{ height: '100vh' }}></div>;
};

export default Editor;