export const backendPorts = [3000, 3001, 3002];
export const backendHost = "localhost";

const healthIntervalArg = process.argv.findIndex((arg) => arg.includes("--i"));

export const healthCheckInterval =
  healthIntervalArg >= 0
    ? parseInt(process.argv[healthIntervalArg + 1])
    : 55000;
