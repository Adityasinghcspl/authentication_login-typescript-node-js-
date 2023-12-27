"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const userSchemaDefinition: Record<any, any> = {
const userSchemaDefinition = {
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
};
const userSchema = new mongoose_1.default.Schema(userSchemaDefinition, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
