import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserPython from 'prettier/parser-python';

export const getDefaultFormattingOptions = (language: string) => {
  switch (language) {
    case 'javascript':
      return { parser: 'babel', plugins: [parserBabel] };
    case 'html':
      return { parser: 'html', plugins: [parserHTML] };
    case 'python':
      return { parser: 'python', plugins: [parserPython] };
    default:
      return { parser: 'babel', plugins: [parserBabel] };
  }
};

export const formatCode = (code: string, language: string): string => {
  const options = getDefaultFormattingOptions(language);
  try {
    return prettier.format(code, { ...options, singleQuote: true, trailingComma: 'es5' });
  } catch (e) {
    console.error('Formatting error:', e);
    return code;
  }
};
