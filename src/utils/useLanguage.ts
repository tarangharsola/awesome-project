{"import { useEditor } from './useEditor';

const useLanguage = () => {
  const editor = useEditor();
  return editor.getLanguage();
};

export default useLanguage;