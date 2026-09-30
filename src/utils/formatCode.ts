import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserPython from 'prettier/parser-python';
import { Language } from '../types/editor';

export const formatCode = (code: string, language: Language): string => {
  let parser: prettier.BuiltInParserName;
  let plugins: any[] = [];

  switch (language) {
    case 'javascript':
      parser = 'babel';
      plugins = [parserBabel];
      break;
    case 'html':
      parser = 'html';
      plugins = [parserHTML];
      break;
    case 'python':
      parser = 'python';
      plugins = [parserPython];
      break;
    default:
      parser = 'babel';
      plugins = [parserBabel];
  }

  try {
    return prettier.format(code, {
      parser,
      plugins,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
  } catch {
    // Return original code if formatting fails
    return code;
  }
};