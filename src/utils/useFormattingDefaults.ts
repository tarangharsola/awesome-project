export type FormattingOptions = {
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
};

export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case 'javascript':
      return { tabWidth: 2, useTabs: false, semi: true, singleQuote: true };
    case 'python':
      return { tabWidth: 4, useTabs: false };
    case 'html':
      return { tabWidth: 2, useTabs: false };
    default:
      return {};
  }
};