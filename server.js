/* Internal modules */
const http = require("http");

/* External modules */
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");

/* Implementation */
const serve = serveStatic("build", { index: ["index.html"] });

const server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res));
});

server.listen(3000);
