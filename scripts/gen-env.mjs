#!/usr/bin/env node
// Generate .env.local with sensible defaults if not exists
import fs from 'fs';
import path from 'path';

const target = path.resolve('.env.local');
if (fs.existsSync(target)) {
  console.log('.env.local already exists. Skip.');
  process.exit(0);
}

const content = `VITE_APP_ENV=local
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
VITE_FF_BETA_BADGE=true
`;

fs.writeFileSync(target, content);
console.log('Created .env.local');


