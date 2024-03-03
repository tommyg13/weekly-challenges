import http from "http";
import { performHealthCheck } from "./performHealthCheck.js";
import { backendRequest } from "./backend-request.js";
import { backendPorts, healthCheckInterval } from "./constants.js";

let connections = 0;

let healthPorts = await performHealthCheck(backendPorts);

setInterval(
  async () => (healthPorts = await performHealthCheck(backendPorts)),
  healthCheckInterval
);

const server = http.createServer((req, res) => {
  console.log(
    `
        Received request from ${req.socket.remoteAddress}
        ${req.method} ${req.url} HTTP/${req.httpVersion}
        Host: ${req.headers.host}
        User-Agent: ${req.headers["user-agent"]}
        Accept: ${req.headers.accept}
    `
  );
  const backendPort = healthPorts[connections % healthPorts.length];

  if (connections < healthPorts.length) {
    connections++;
  } else {
    connections = 0;
  }

  backendRequest(backendPort, req, res);
});

server.listen(80, () => {
  console.log("Load balancer running at http://localhost:80/");
});

server.on("error", (error) => {
  console.error(error);
});
