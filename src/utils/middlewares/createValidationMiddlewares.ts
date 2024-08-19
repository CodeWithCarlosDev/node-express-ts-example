import { Request, Response, NextFunction } from "express";
import { AnySchema } from "@hapi/joi";
import validate from "../validate";

type PayloadKey = "body" | "query" | "params";

type ValidationSchema = {
    body?: AnySchema;
    query?: AnySchema;
    params?: AnySchema;
}

// @param {Object} validationSchema - {[K in "body" | "query"| "params" ]: "joiSchema" }
function createValidateMiddleware(validationSchema: ValidationSchema) {

    const [[payloadKey, joiSchema]] = Object.entries(validationSchema) as [PayloadKey, AnySchema][];

    if (payloadKey !== "body" &&
        payloadKey !== "query" &&
        payloadKey !== "params"
    ) {
        throw new Error(
            "Invalid payload key must be one of 'body','query','params' "
        );
    }

    return function validationMiddleware(req: Request, res: Response, next: NextFunction) {
        const error = validate(req[payloadKey], joiSchema);
        error ? next(error) : next();
    }
}


export default createValidateMiddleware;