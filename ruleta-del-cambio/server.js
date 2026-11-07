const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

http.createServer((request, response) => {
  const requested = request.url === "/" ? "/index.html" : request.url.split("?")[0];
  const file = path.resolve(root, `.${decodeURIComponent(requested)}`);

  if (!file.startsWith(root)) {
    response.writeHead(403).end("Acceso denegado");
    return;
  }

  fs.readFile(file, (error, content) => {
    if (error) {
      response.writeHead(404).end("Archivo no encontrado");
      return;
    }
    response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    response.end(content);
  });
}).listen(4173, "127.0.0.1", () => {
  console.log("INTERFAZ disponible en http://127.0.0.1:4173");
});
