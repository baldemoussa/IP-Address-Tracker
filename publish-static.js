import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const scriptTag = 'src="./dist/index.js"';

mkdirSync(dist, { recursive: true });

const sourceHtml = readFileSync(join(root, "index.html"), "utf8");
if (!sourceHtml.includes(scriptTag)) {
    console.error("index.html no longer points at ./dist/index.js, so the published page was not updated.");
    process.exit(1);
}

writeFileSync(join(dist, "index.html"), sourceHtml.replace(scriptTag, 'src="./index.js"'));
cpSync(join(root, "style.css"), join(dist, "style.css"));
cpSync(join(root, "images"), join(dist, "images"), { recursive: true });

console.log("Published static site to dist/");
