"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = require("os");
// Routers import
const catRouter = require("./routes/category");
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/category", catRouter);
const PORT = process.env.PORT || 8000;
// Database connection
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB).then(() => {
    console.log("Database connection successfully!");
});
// server connect
app.listen(PORT, () => {
    let ip = null;
    let osType = process.platform;
    if (osType.toLowerCase() === "linux") {
        ip = (0, os_1.networkInterfaces)()["enp2s0"][0]["address"];
    }
    else if (osType.toLowerCase() === "darwin") {
        ip = (0, os_1.networkInterfaces)()["en0"][1]["address"];
    }
    return console.table([
        "Server is listening",
        `Localhost => http://localhost:${PORT}`,
        ip && `ip address => http://${ip}:${PORT}`,
    ]);
});
//# sourceMappingURL=server.js.map