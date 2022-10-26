import {Request, Response} from 'express';

export function notFound(_req: Request, res: Response) {
    res.sendStatus(404);
}
