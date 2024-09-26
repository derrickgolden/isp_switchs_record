"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.killProcess = void 0;
const child_process_1 = require("child_process");
// Function to find the process by name and kill it
const killProcess = (processName) => {
    // Step 1: Use 'ps aux' to find the running process by name (e.g., 'app.js')
    (0, child_process_1.exec)(`ps aux | grep ${processName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        // Step 2: Filter the process line to get the process ID (PID)
        const processLines = stdout.split('\n');
        processLines.forEach(line => {
            // Find the relevant process (ignore the 'grep' command itself)
            if (line.includes(processName) && !line.includes('grep')) {
                const parts = line.trim().split(/\s+/);
                const pid = parts[1]; // PID is the second element
                console.log(`Found process: ${processName} with PID: ${pid}`);
                // Step 3: Kill the process using the PID
                (0, child_process_1.exec)(`kill -9 ${pid}`, (killError, killStdout, killStderr) => {
                    if (killError) {
                        console.error(`Failed to kill process with PID ${pid}: ${killError.message}`);
                        return;
                    }
                    console.log(`Successfully killed process with PID ${pid}`);
                });
            }
        });
        return processLines;
    });
};
exports.killProcess = killProcess;
//# sourceMappingURL=processKill.js.map