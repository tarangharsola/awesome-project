{"import { useEditor } from './useEditor';

const useCursor = () => {
  const editor = useEditor();
  return editor.getCursor();
};

export default useCursor;