import {config} from 'dotenv';
import express, {Express} from 'express';

import router from "../client/reducers/router";
import {notFound, queryParser} from "./controllers";


config();
export const server: Express = express();

server
    .disable('x-powered-by')
    .enable('trust proxy')
    .set('query parser', queryParser)
    .use(router)
    .use(notFound);
