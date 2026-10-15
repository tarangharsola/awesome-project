import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';

/**
 * Formats code based on the selected language.
 * Supports JavaScript (via Babel parser) and HTML.
 * For unsupported languages (e.g., Python), returns the original code.
 */
export const formatCode = (code: string, language: string): string => {
  try {
    if (language === 'javascript') {
      return prettier.format(code, { parser: 'babel', plugins: [parserBabel] });
    }
    if (language === 'html') {
      return prettier.format(code, { parser: 'html', plugins: [parserHtml] });
    }
    // Fallback for Python or other languages
    return code;
  } catch (error) {
    console.error('Formatting error:', error);
    return code;
  }
};
