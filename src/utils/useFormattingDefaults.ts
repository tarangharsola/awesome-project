{"import { useState } from 'react';
import { useEditor } from '../utils/useEditor';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    tabSize: 2,
    indentSize: 2,
  });
  const { editor } = useEditor();

  const handleFormatDefaultsChange = (event) => {
    setFormattingDefaults({
      tabSize: event.target.tabSize.value,
      indentSize: event.target.indentSize.value,
    });
  };

  return {
    formattingDefaults,
    handleFormatDefaultsChange,
  };
};

export default useFormattingDefaults;