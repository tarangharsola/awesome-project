import { useState, useEffect } from 'react';
import Editor from '../components/Editor';

const useEditor = () => {
   const [editorState, setEditorState] = useState('');

   useEffect(() => {
      // Initialize editor state
   }, []);

   return { editorState, setEditorState };
};

export default useEditor;