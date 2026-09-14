import { Language } from '../types/editor';

export const getDefaultContent = (language: Language): string => {
  switch (language) {
    case 'javascript':
      return `// JavaScript starter\nfunction main() {\n  console.log('Hello, world!');\n}\n`;
    case 'python':
      return `# Python starter\ndef main():\n    print("Hello, world!")\n`;
    case 'html':
      return `<!-- HTML starter -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Collaborative Editor</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>\n`;
    default:
      return '';
  }
};