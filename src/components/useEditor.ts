{"import { useSlate } from 'slate-react';

interface EditorProps {
  value: any;
  onChange: (value: any) => void;
}

const useEditor = (props: EditorProps) => {
  const editor = useSlate(props);

  return editor;

  return useEditor;
}
export default useEditor;