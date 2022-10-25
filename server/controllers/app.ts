import {Request, Response} from 'express';

export function renderApp(req: Request, res: Response) {
    const resHeaders = res.getHeaders();
    // req.tld!

    const {
        ip,
        nonce,
    } = (req);

    res.renderBundle('desktop', {
        ip,
        nonce,
        resHeaders,
        csrfToken: req.csrfToken(),
    });
}
