export default function getDefaultContent(language: string): string {
  switch (language) {
    case 'javascript':
      return `// JavaScript starter\nfunction main() {\n  console.log('Hello, world!');\n}\n\nmain();\n`;
    case 'python':
      return `# Python starter\ndef main():\n    print(\"Hello, world!\")\n\nif __name__ == \"__main__\":\n    main()\n`;
    case 'html':
      return `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>\n`;
    default:
      return '';
  }
}
