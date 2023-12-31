"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const router = express_1.default.Router();
router.use(validateTokenHandler_1.validateToken);
router.route("/").get(contactController_1.getContacts).post(contactController_1.createContact);
router.route("/:id").get(contactController_1.getContact).put(contactController_1.updateContact).delete(contactController_1.deleteContact);
exports.default = router;
