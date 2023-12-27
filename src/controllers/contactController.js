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
exports.deleteContact = exports.updateContact = exports.getContact = exports.createContact = exports.getContacts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const contactModel_1 = __importDefault(require("../models/contactModel"));
const mongoose_1 = __importDefault(require("mongoose"));
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contactModel_1.default.find();
    res.status(200).json(contacts);
}));
exports.getContacts = getContacts;
//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const contact = yield contactModel_1.default.create({ name, email, phone, user_id: userId });
    res.status(201).json(contact);
}));
exports.createContact = createContact;
//@desc Get contact
//@route GET /api/contacts/:id
// //@access private
const getContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid Contact ID' });
        return;
    }
    const contact = yield contactModel_1.default.findById(req.params.id);
    if (!contact) {
        const error = new Error('Contact not found');
        res.status(404).json({ error: 'Contact not found' });
        throw error; // Throw the error to be caught by asyncHandler
    }
    res.status(200).json(contact);
}));
exports.getContact = getContact;
//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid Contact ID' });
        return;
    }
    const contact = yield contactModel_1.default.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact = yield contactModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
}));
exports.updateContact = updateContact;
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid Contact ID' });
        return;
    }
    const contact = yield contactModel_1.default.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if ((contact === null || contact === void 0 ? void 0 : contact.user_id.toString()) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id)) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
    }
    else {
        res.status(403);
        throw new Error("User create contact is not exist");
    }
    yield contactModel_1.default.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
}));
exports.deleteContact = deleteContact;
