/**
 * Provides default starter content for each supported language.
 * This helps users start with a sensible template when they switch languages.
 */
export const getDefaultContent = (language: string): string => {
  switch (language) {
    case 'javascript':
      return `// JavaScript starter
function hello() {
  console.log('Hello, world!');
}`;
    case 'python':
      return `# Python starter
def hello():
    print('Hello, world!')`;
    case 'html':
      return `<!-- HTML starter -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>`;
    default:
      return '';
  }
};
