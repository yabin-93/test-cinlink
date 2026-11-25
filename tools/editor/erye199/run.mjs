import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseCases, targetOrigin, json } from './core.mjs';
const argv = process.argv.slice(2), args = {};
for (let i = 0; i < argv.length; i++) { const key = argv[i]; if (!key.startsWith('--')) throw Error('未知参数' + key); if (['--list', '--keep-space'].includes(key)) args[key] = true; else { if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw Error('参数缺值' + key); args[key] = argv[++i]; } }
const allowed = ['--base-url', '--cases', '--space-id', '--ego', '--ffmpeg', '--ffprobe', '--font-file', '--list', '--keep-space'];
for (const key of Object.keys(args)) if (!allowed.includes(key)) throw Error('未知参数' + key);
const ids = parseCases(args['--cases']); if (args['--list']) { console.log(ids.map(id => 'ERYE199-' + id).join('\n')); process.exit(0); }
if (!args['--base-url']) throw Error('必须用--base-url明确目标环境（会创建测试数据）');
const repo = fileURLToPath(new URL('../../../', import.meta.url));
const batch = new Date().toISOString().replaceAll(/[:.]/g, '-');
const config = { repo, batch, baseURL: targetOrigin(args['--base-url']), cases: ids, outDir: path.join(repo, 'reports', 'erye199-auto-' + batch), spaceId: args['--space-id'] === undefined ? undefined : Number(args['--space-id']), keepSpace: !!args['--keep-space'], ffmpeg: args['--ffmpeg'] || process.env.CINLINK_FFMPEG, ffprobe: args['--ffprobe'] || process.env.CINLINK_FFPROBE, fontFile: args['--font-file'] };
if (config.spaceId !== undefined && (!Number.isInteger(config.spaceId) || config.spaceId < 0)) throw Error('无效TaskSpace ID');
await json(path.join(config.outDir, 'config.json'), config);
const entry = path.join(config.outDir, 'entry.mjs');
await fs.writeFile(entry, `import{runSuite}from ${JSON.stringify(pathToFileURL(path.join(repo, 'tools/editor/erye199/worker.mjs')).href)};await runSuite(${JSON.stringify(config)});\n`);
const ego = args['--ego'] || process.env.EGO_BROWSER || (process.platform === 'win32' ? 'C:/Program Files/Citro Labs/ego lite/Application/0.6.2.7/ego-browser.exe' : 'ego-browser');
const proc = spawnSync(ego, ['nodejs', '-e', `await import(${JSON.stringify(pathToFileURL(entry).href)})`], { stdio: 'inherit', timeout: 25 * 60_000 });
console.log('证据目录：' + config.outDir);
if (proc.error || proc.status !== 0) { console.error(proc.error?.message || 'Ego执行未完成；保留现场，不自动重试'); process.exitCode = 2; }
else { const results = JSON.parse(await fs.readFile(path.join(config.outDir, 'results.json'), 'utf8')); process.exitCode = results.some(r => r.status === 'Failed') ? 1 : results.length !== ids.length || results.some(r => ['Blocked', 'Not Run'].includes(r.status)) ? 2 : 0; }
