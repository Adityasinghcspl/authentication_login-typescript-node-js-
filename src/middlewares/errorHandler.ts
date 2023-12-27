import { Request, Response, NextFunction } from 'express';
import { constants } from '../utils/constants';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = res.statusCode ? res.statusCode : 500;
  console.log(statusCode,"=================")
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'Validation Failed',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
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

export default errorHandler;
