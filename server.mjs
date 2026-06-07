import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const mime = { '.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json' };

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  file = path.join(root, file);
  try {
    const content = fs.readFileSync(file);
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(8080, () => console.log('HarithaStream running at http://localhost:8080'));
