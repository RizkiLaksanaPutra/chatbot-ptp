import { createServer } from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";

const app = next({ dev: false });
const handle = app.getRequestHandler();

const cert = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

app.prepare().then(() => {
  createServer(cert, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443);

  console.log("> Server started");
});