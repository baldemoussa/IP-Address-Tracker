import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const port = Number(process.env.PORT) || 3000;

const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
};

function insideRoot(filePath) {
    return filePath === root || filePath.startsWith(root + sep);
}

const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    let pathname;
    try {
        pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
        response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Bad request");
        return;
    }

    if (pathname.endsWith("/")) {
        pathname += "index.html";
    }

    const filePath = resolve(root, `.${pathname}`);
    if (!insideRoot(filePath)) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
    }

    let target = filePath;
    try {
        const stats = statSync(filePath);
        if (stats.isDirectory()) {
            target = join(filePath, "index.html");
        }
        statSync(target);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
    }

    const contentType = types[extname(target).toLowerCase()] ?? "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    createReadStream(target).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
    console.log(`IP Address Tracker listening on ${port}`);
});
