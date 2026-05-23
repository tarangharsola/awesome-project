const fs = require('fs');
const path = require('path');

module.exports = function build() {
  const src = 'src';
  const dist = 'public';
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const filePath = path.join(src, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const distPath = path.join(dist, file);
      fs.mkdirSync(distPath);
    } else if (file.endsWith('.tsx')) {
      const distPath = path.join(dist, file);
      fs.copyFileSync(filePath, distPath);
    }
  });
};