import success from "./success.ts";
import warn from "./warn.ts";
import error from "./error.ts";
import debug from "./debug.js";

function log(message: string, type: string): any {
  const colors = {
    success: "[32m",
    warn: "[33m",
    error: "[31m",
    debug: "[34m",
    loading: "[35m",
  };

  switch (type) {
    case "success":
      const successMessage = success(message);
      console.log("\x1b" + colors.success, successMessage);
    case "warn":
      const warnMessage = warn(message);
      console.log("\x1b" + colors.warn, warnMessage);
    case "error":
      const errorMessage = error(message);
      console.log("\x1b" + colors.error, errorMessage);
    case "debug":
      const debugMessage = debug(message);
      console.log("\x1b" + colors.debug, debugMessage);
    case "loading":
      const loadingTypes = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
      let i = 0;

      const interval = setInterval(() => {
        i = (i + 1) % loadingTypes.length;
        process.stdout.write(`\r${loadingTypes[i]} ${message}`);
      }, 100);

      const stop = () => {
        clearInterval(interval);
        process.stdout.write(`\r${message}\n`);
      };

      console.log("\x1b" + colors.loading, loadingTypes[i] + message);

      return stop;
    default:
      console.log("\x1b" + colors.error, error("Invalid type"));
  }
}

export default log;