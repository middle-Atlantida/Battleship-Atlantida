import {Request, Response} from 'express';
import cfg from "../../lib/cfg";


const RTC_ENV = process.env.RTC_ENV || cfg.__DEV__;

export default function renderApp(req: Request, res: Response) {
    const resHeaders = res.getHeaders();
    const {
        ip,
    } = req;
}
