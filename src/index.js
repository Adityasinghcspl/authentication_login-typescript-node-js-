"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, dbConnection_1.default)();
// Middleware to parse JSON in request body
app.use(express_1.default.json());
app.use("/api/contacts", contactRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
