import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await cp('server.mjs', 'dist/server.mjs');
await cp('package.json', 'dist/package.json');
await cp('manus-routes.json', 'dist/manus-routes.json');
await cp('public', 'dist/public', { recursive: true });
console.log('BloomBuddy build ready in dist/');
