const express = require("express");
const next = require("next");
const favicon = require("express-favicon");
const path = require("path");

const port = parseInt(process.env.PORT, 10) || 80;
// const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();

const redirects = ["roadgraph", "test", "test/result"];

const server = express();

redirects.forEach((route) => {
  server.all(`/${route}/`, (req, res) => {
    res.redirect(`/tools/${route}`);
  });
});

server.use(
  "/tools",
  favicon(path.join(__dirname, "tools", "build", "favicon.ico"))
);

// the __dirname is the current directory from where the script is running
// server.use("/tools", express.static(path.join(__dirname, "tools")));
server.use("/tools/", express.static(path.join(__dirname, "tools", "build")));

server.get(/\/tools\/.+/, function (req, res) {
  res.sendFile(path.join(__dirname, "tools", "build", "index.html"));
});

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
