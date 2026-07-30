const os = require('os');
const { spawn } = require('child_process');

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const ip = getLocalIp();
console.log(`Starting dev server — open http://${ip}:3000 in your browser`);

const child = spawn('npm', ['run', 'dev:run'], { stdio: 'inherit', shell: true });
child.on('close', (code) => process.exit(code));
child.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});
