import http from "http";
import { backendHost } from "./constants.js";

export async function performHealthCheck(ports) {
  const healthChecks = ports.map(async (port) => {
    const server = `http://${backendHost}:${port}/server-status`;
    const isHealthy = await checkServerHealth(server);
    console.log(`${server} is ${isHealthy ? "healthy" : "unhealthy"}`);
    return { port, isHealthy };
  });

  const results = await Promise.all(healthChecks);
  return results
    .filter((result) => result.isHealthy)
    .map((result) => result.port);
}

function checkServerHealth(server) {
  return new Promise((resolve, reject) => {
    http
      .get(server, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on("error", (err) => {
        resolve(false);
      });
  });
}
