import {config} from 'dotenv';
import {Express} from 'express';
import express = require("express");

// eslint-disable-next-line
config();

import {notFound, queryParser} from "./controllers";
import router from "../client/reducers/router";

const server: Express = express();

server
    .disable('x-powered-by')
    .enable('trust proxy')
    .set('query parser', queryParser)
    .use(router)
    .use(notFound);

export default server;
