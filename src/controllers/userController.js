"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const hashPassword_1 = require("../middlewares/hashPassword");
const userModel_1 = __importDefault(require("../models/userModel"));
// req.params is used to get the ---- route variables
// req.body is used to get the HTTP requeste data -----  HTTP request body
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = yield userModel_1.default.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }
    // Hash password
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
    const user = yield userModel_1.default.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
}));
exports.registerUser = registerUser;
//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = yield userModel_1.default.findOne({ email });
    //compare password with hashedpassword
    if (user && (yield (0, hashPassword_1.comparePasswords)(password, user.password))) {
        const accessToken = (0, validateTokenHandler_1.generateToken)({
            _id: user._id,
            email: user.email,
            username: user.username
        });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
}));
exports.loginUser = loginUser;
const currentUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
}));
exports.currentUser = currentUser;
