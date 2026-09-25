/**
 * Very lightweight formatter that normalizes indentation to 2 spaces
 * and trims trailing whitespace. It does not attempt full language parsing
 * to keep dependencies minimal.
 */
export const formatCode = (code: string, _facet?: any): string => {
  const lines = code.split('\n');
  const formatted = lines
    .map((line) => line.replace(/\s+$/g, '')) // trim trailing spaces
    .map((line) => {
      const leading = line.match(/^\s*/)?.[0] ?? '';
      const spaces = leading.replace(/\t/g, '  ');
      const normalized = spaces.replace(/ {4}/g, '  ');
      return normalized + line.slice(leading.length);
    })
    .join('\n');
  return formatted.trimEnd();
};
