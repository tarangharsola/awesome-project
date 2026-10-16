import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserPython from 'prettier/parser-python';

export const formatCode = (code: string, language: string): string => {
  try {
    let parser: any = 'babel';
    if (language === 'python') parser = 'python';
    else if (language === 'html') parser = 'html';
    const plugins: any[] = [];
    if (parser === 'babel') plugins.push(parserBabel);
    if (parser === 'html') plugins.push(parserHTML);
    if (parser === 'python') plugins.push(parserPython);
    return prettier.format(code, { parser, plugins, singleQuote: true, trailingComma: 'es5' });
  } catch (e) {
    console.error('Formatting error:', e);
    return code;
  }
};
