"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode, "=================");
    switch (statusCode) {
        case constants_1.constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation Failed',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants_1.constants.NOT_FOUND:
            res.json({
                title: 'Not Found',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants_1.constants.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants_1.constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants_1.constants.SERVER_ERROR:
            res.json({
                title: 'Server Error',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            console.log('No Error, All good !');
            break;
    }
};
exports.default = errorHandler;
