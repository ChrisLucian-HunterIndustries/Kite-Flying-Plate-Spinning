import { readdirSync, readFileSync, existsSync } from 'node:fs';

export const normalizeEol = (text) => text.replace(/\r\n/g, '\n');

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

export function parseFrontmatter(text, source) {
  const match = FRONTMATTER.exec(normalizeEol(text));
  if (!match) throw new Error(`${source}: missing --- frontmatter ---`);
  const meta = {};
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':');
    if (at < 1) throw new Error(`${source}: bad frontmatter line "${line}"`);
    meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return { meta, body: match[2].replace(/^\n+|\n+$/g, '') };
}

const list = (value) => (value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []);

export function toWind(fileName, text) {
  const { meta, body } = parseFrontmatter(text, fileName);
  if (!meta.title) throw new Error(`${fileName}: title is required`);
  if (meta.kind !== 'principle' && meta.kind !== 'checklist') {
    throw new Error(`${fileName}: kind must be principle or checklist`);
  }
  return {
    id: fileName.replace(/^\d+-/, '').replace(/\.md$/, ''),
    title: meta.title,
    checklist: meta.checklist || meta.title,
    kind: meta.kind,
    default: meta.default === 'true',
    summary: meta.summary || '',
    skills: list(meta.skills),
    mcp: list(meta.mcp),
    body,
  };
}

function toMcp(name, text) {
  const file = `${name}.json`;
  const { name: declared, ...mcp } = JSON.parse(text);
  if (declared !== name) throw new Error(`${file}: name must be "${name}"`);
  if (!mcp.title || !mcp.description) throw new Error(`${file}: title and description are required`);
  if (!/^https:\/\//.test(mcp.repository || '')) throw new Error(`${file}: repository must be an https URL`);
  if (!mcp.server?.command || !Array.isArray(mcp.server.args)) throw new Error(`${file}: server needs a command and args`);
  return mcp;
}

export function loadWindBundle(windDir) {
  const winds = readdirSync(windDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => toWind(f, readFileSync(new URL(f, windDir), 'utf8')));

  const skills = {};
  for (const name of new Set(winds.flatMap((w) => w.skills))) {
    const file = new URL(`skills/${name}/SKILL.md`, windDir);
    if (!existsSync(file)) throw new Error(`skill "${name}" has no wind/skills/${name}/SKILL.md`);
    const content = normalizeEol(readFileSync(file, 'utf8'));
    const { meta } = parseFrontmatter(content, `${name}/SKILL.md`);
    if (meta.name !== name) throw new Error(`${name}/SKILL.md: name must be "${name}"`);
    skills[name] = { description: meta.description || '', content };
  }

  const mcp = {};
  for (const name of new Set(winds.flatMap((w) => w.mcp))) {
    const file = new URL(`mcp/${name}.json`, windDir);
    if (!existsSync(file)) throw new Error(`MCP server "${name}" has no wind/mcp/${name}.json`);
    mcp[name] = toMcp(name, readFileSync(file, 'utf8'));
  }
  return { winds, skills, mcp };
}
