"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchemaDefinition = {
    user_id: {
        type: String,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },
    phone: {
        type: Number,
        required: [true, "Please add the contact phone number"],
    },
};
const contactSchema = new mongoose_1.default.Schema(contactSchemaDefinition, {
    timestamps: true,
});
const contactModel = mongoose_1.default.model("Contact", contactSchema);
exports.default = contactModel;
