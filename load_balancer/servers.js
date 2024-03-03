import http from "http";

for (let i = 0; i < 3; i++) {
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/server-status") {
      if (i == 2) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server ${i + 1} is not running.`);
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Server ${i + 1} is running.`);
      }
    } else {
      console.log(
        `
        Received request from ${req.socket.remoteAddress}
        ${req.method} ${req.url} HTTP/${req.httpVersion}
        Host: ${req.headers.host}
        User-Agent: ${req.headers["user-agent"]}
        Accept: ${req.headers.accept}
    `
      );
      res.end(
        `Hello World! from server server ${i + 1} http://localhost:${
          3000 + i
        } \n`
      );
    }
  });

  server.listen(`${3000 + i}`, () => {
    console.log(`Server ${i} running at http://localhost:${3000 + i}/`);
  });

  server.on("error", (error) => {
    console.error(error);
  });
}
