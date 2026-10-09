export function formatCode(code: string, language: string): string {
  // Simple formatter: trim trailing whitespace on each line and ensure a final newline.
  const trimmed = code
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''))
    .join('\n');
  return trimmed.endsWith('\n') ? trimmed : trimmed + '\n';
}
