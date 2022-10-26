import {config} from 'dotenv';
import express, {Express} from 'express';

import { routerReducer } from "../client/reducers/router";
import {notFound, queryParser} from "./controllers";


config();
export const server: Express = express();

server
    .disable('x-powered-by')
    .enable('trust proxy')
    .set('query parser', queryParser)
    .use(routerReducer)
    .use(notFound);
