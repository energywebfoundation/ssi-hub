import { InternalServerErrorException } from "@nestjs/common";
import csurf from "csurf";
import { NextFunction, Request, Response } from "express";

export const checkClientCsrf = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['server-request']) {
        // client request with csrf protection
        const csrf = csurf({
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            }
        })
        csrf(req, res, next)
    } else if (req.headers['server-request'] === process.env.CSRF_SERVER_SECRET) {
        // validated server request
        next()
    } else {
        // no csrf protection and not a server request as well
        throw new InternalServerErrorException('Something went wrong')
    }
}