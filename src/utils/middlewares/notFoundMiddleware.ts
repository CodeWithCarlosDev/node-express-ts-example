import boom from "@hapi/boom";
import { Request, Response } from "express";


function notFoundMiddleware(req: Request, res: Response) {
    const {
        output: { statusCode, payload }
    } = boom.notFound();

    res.status(statusCode).json(payload);
}

export default notFoundMiddleware;