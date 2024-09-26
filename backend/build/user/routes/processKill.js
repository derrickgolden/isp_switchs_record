"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const router = express_1.default.Router();
// Function to find the process by name and kill it
router.get('/kill', async (req, res) => {
    // Step 1: Use 'ps aux' to find the running process by name (e.g., 'app.js')
    const { processName } = req.params;
    try {
        (0, child_process_1.exec)(`ps aux | grep ${processName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return res.status(302).json({ success: false, msg: `Failed to kill process`,
                    err: error.message });
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
                            return res.status(302).json({ success: false, msg: `Failed to kill process with PID ${pid}`,
                                err: killError.message });
                        }
                        console.log(`Successfully killed process with PID ${pid}`);
                    });
                }
            });
            res.status(200).json({ success: true, msg: `Successfully killed process with PID ${processLines}` });
        });
    }
    catch (error) {
        res.status(302).json({ success: false, msg: "Process kill error", err: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=processKill.js.map