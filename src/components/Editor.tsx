{"import React, { useRef, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor() {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const contentState = ContentState.createFromText('');
      editor.focus();
      editor.setValue(contentState.getPlainText());
    }
  }, []);

  return (
    <div ref={editorRef} className='editor' />
  );
}

export default Editor;