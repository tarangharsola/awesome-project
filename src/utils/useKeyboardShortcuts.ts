{"import { useState } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = (props: Props) => {
  const [shortcuts, setShortcuts] = useState({
    indent: 'tab',
    outdent: 'shift+tab',
    newline: 'enter',
  });

  return shortcuts;
};

export default useKeyboardShortcuts;