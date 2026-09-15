export interface FormattingStrategy {
  format: (code: string) => string;
}

export const getFormattingDefaults = (language: string): FormattingStrategy => {
  switch (language) {
    case 'javascript':
    case 'html':
      return {
        format: (code: string) => {
          // Simple line‑trim and 2‑space indentation placeholder
          return code
            .split('\n')
            .map((line) => line.trim())
            .join('\n');
        },
      };
    case 'python':
      return {
        format: (code: string) => {
          // Convert leading tabs to 4 spaces for Python
          return code
            .split('\n')
            .map((line) => line.replace(/^\t+/, (m) => ' '.repeat(m.length * 4)).trim())
            .join('\n');
        },
      };
    default:
      return { format: (c) => c };
  }
};