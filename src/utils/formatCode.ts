import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';

/**
 * Formats code based on language using Prettier where possible.
 * Falls back to returning the original code for unsupported languages.
 */
export const formatCode = (code: string, language: string): string => {
  try {
    switch (language) {
      case 'javascript':
        return prettier.format(code, {
          parser: 'babel',
          plugins: [parserBabel],
          tabWidth: 2,
          useTabs: false,
        });
      case 'html':
        return prettier.format(code, {
          parser: 'html',
          plugins: [parserHTML],
          tabWidth: 2,
          useTabs: false,
        });
      case 'python':
        // Simple indentation fix for Python (2 spaces). Real formatting would need black or autopep8.
        return code
          .split('\n')
          .map((line) => line.replace(/^\t+/g, (m) => ' '.repeat(m.length * 2)))
          .join('\n');
      default:
        return code;
    }
  } catch (err) {
    console.error('Formatting error:', err);
    return code;
  }
};