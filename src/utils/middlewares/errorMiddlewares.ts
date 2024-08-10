import config from "../../config";
import { Request, Response, NextFunction } from "express";


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
        return { ...error, stack }
    }

    return error;
}


function logError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("loginError");
    next(err);
}

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


function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log("errorHandler");
    res.status(err.output.statusCode);
    const resul = withErrorStack(err.output.payload, err.stack);
    console.log(resul)
    res.json(resul);
}

export {
    logError,
    wrapErrors,
    errorHandler
}