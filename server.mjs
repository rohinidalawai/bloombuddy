import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = normalize(requestPath).replace(/^\.\.(\/|\\|$)/, '');
  const candidate = join(root, safePath === '/' ? 'index.html' : safePath);

  try {
    const info = await stat(candidate);
    if (info.isFile()) {
      const body = await readFile(candidate);
      res.writeHead(200, { 'Content-Type': mime[extname(candidate)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(body);
      return;
    }
  } catch {}

  const body = await readFile(join(root, 'index.html'));
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  res.end(body);
});

server.listen(port, '0.0.0.0', () => console.log(`BloomBuddy listening on http://0.0.0.0:${port}`));
