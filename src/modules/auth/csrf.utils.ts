import csurf from "csurf";
import { NextFunction, Request, Response } from "express";

export const checkClientCsrf = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['server-request']) {
        const csrf = csurf({
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            }
        })
        csrf(req, res, next)
    } else {
        next()
    }
}