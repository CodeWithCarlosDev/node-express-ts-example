import config from "../../config";
import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom"

interface CustomError {
    stack?: any;
    output: {
        statusCode: number;
        payload: {
            error: string;
            message: any;
        };
    };
}

function withErrorStack(error: CustomError, stack: any) {
    if (config.dev) {
        return { ...error, stack };
    }
    return error;
}

function logError(err: Error, req: Request, res: Response, next: NextFunction) {
    next(err);
}

function wrapErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

/*
function wrapErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("wrapErrors");
    const badImplementationError: CustomError = {
        stack: err.stack,
        output: {
            statusCode: 500,
            payload: {
                error: "Internal Server Error",
                message: err.message,
            }
        }
    }
 
    next(badImplementationError);
}
*/

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const { stack, output: { statusCode, payload } } = err;
    res.status(statusCode);
    const resul = withErrorStack(payload, stack);
    res.json(resul);
}

export {
    logError,
    wrapErrors,
    errorHandler
}