{"import { keyMap } from 'react-simple-code-editor';

const customKeyMap = {
  ...keyMap,
  'Ctrl+Shift+P': 'format-code',
  'Ctrl+Shift+L': 'toggle-line-numbers',
};

export default customKeyMap;