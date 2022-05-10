import { Response } from 'express-serve-static-core';

export const responseOk = (res: Response, data?: any, status = 200) => {
    res.status(status).json({ msg: "ok", data })
}

export const responseError = (res: Response, msg = "error", status = 400) => {
    res.status(status).json({ msg })
}