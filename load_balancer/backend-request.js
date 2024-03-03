import { backendHost } from "./constants.js";
import http from "http";

export const backendRequest = (backendPort, req, res) => {
  const options = {
    hostname: backendHost,
    port: backendPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const backendReq = http.request(options, (backendRes) => {
    res.writeHead(backendRes.statusCode, backendRes.headers);

    backendRes.pipe(res, { end: true });
  });

  req.pipe(backendReq, { end: true });

  backendReq.on("error", (err) => {
    console.error("Error while forwarding request to backend:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  });
};
