{"import { useState } from 'react';
import { useEditor } from './useEditor';

const useFormattingDefaults = () => {
  const [tabSize, setTabSize] = useState(2);
  const { editor } = useEditor();
  const handleTabSizeChange = (size: number) => {
    setTabSize(size);
    editor.setTabSize(size);
  };
  return { tabSize, handleTabSizeChange };
};

export default useFormattingDefaults;