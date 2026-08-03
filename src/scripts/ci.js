import { exec } from 'child_process';

exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stdout);
  }
});