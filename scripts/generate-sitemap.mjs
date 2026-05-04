import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'https://www.kalkylatorn.com';

const appPath = path.join(ROOT, 'src', 'App.tsx');
const blogPostPath = path.join(ROOT, 'src', 'pages', 'BlogPost.tsx');
const featureFlagsPath = path.join(ROOT, 'src', 'contexts', 'FeatureFlagContext.tsx');
const outputPath = path.join(ROOT, 'public', 'sitemap.xml');

const appSource = fs.readFileSync(appPath, 'utf8');
const blogPostSource = fs.readFileSync(blogPostPath, 'utf8');
const featureFlagsSource = fs.readFileSync(featureFlagsPath, 'utf8');

const routeRegex = /<Route\s+path="([^"]+)"/g;
const dynamicSegmentRegex = /\/:[^/]+/;
const blogIdRegex = /id:\s*'([^']+)'/g;
const calculatorRegex =
  /\{\s*id:\s*'[^']+'.*?path:\s*'([^']+)'.*?premium:\s*(true|false)\s*\}/gs;

const routePaths = [];
for (const match of appSource.matchAll(routeRegex)) {
  routePaths.push(match[1]);
}

const premiumByPath = new Map();
for (const match of featureFlagsSource.matchAll(calculatorRegex)) {
  const calculatorPath = match[1];
  const isPremium = match[2] === 'true';
  premiumByPath.set(calculatorPath, isPremium);
}

const filteredRoutes = routePaths.filter((routePath) => {
  if (dynamicSegmentRegex.test(routePath)) return false;
  if (premiumByPath.get(routePath) === true) return false;
  return true;
});

const blogPostPaths = [];
for (const match of blogPostSource.matchAll(blogIdRegex)) {
  blogPostPaths.push(`/blog/${match[1]}`);
}

const uniquePaths = [...new Set([...filteredRoutes, ...blogPostPaths])];

uniquePaths.sort((a, b) => {
  const getPriority = (value) => {
    if (value === '/') return 0;
    if (value === '/blog') return 1;
    return 2;
  };

  const priorityDiff = getPriority(a) - getPriority(b);
  if (priorityDiff !== 0) return priorityDiff;
  return a.localeCompare(b, 'sv');
});

const today = new Date().toISOString().slice(0, 10);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths
  .map((routePath) => `  <url>
    <loc>${DOMAIN}${routePath}</loc>
    <lastmod>${today}</lastmod>
  </url>`)
  .join('\n')}
</urlset>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemapXml, 'utf8');

console.log(`Sitemap generated with ${uniquePaths.length} URLs at ${outputPath}`);
