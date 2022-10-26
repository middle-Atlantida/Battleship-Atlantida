import {readFileSync} from 'fs';
import * as https from "https";
import {homedir} from 'os';
import {resolve} from 'path';

import {Express} from 'express';
import Loadable from 'react-loadable';

import {dbConnect} from "../init";
import {makeStartLogsText} from "./startLogs";


interface Options {
    server: Express;
}

const {PORT = 3000} = process.env;

const pem = readFileSync(resolve(`${homedir()}/.certs`, 'dev.pem'), 'utf8');

const APP_HOSTS: string[] = [
    'localhost',
];

export function startApp({server}: Options) {
    dbConnect().then(() => {
        Loadable.preloadAll().then(() => {
            if (process.env.__DEV__ && pem) {
                https
                    .createServer({key: pem, cert: pem}, server)
                    .listen(PORT, () => {
                        // eslint-disable-next-line
                        console.log(makeStartLogsText(APP_HOSTS, 'https', PORT));
                    });
                return;
            }

            server.listen(PORT, () => {
                // eslint-disable-next-line
                console.log(makeStartLogsText(APP_HOSTS, 'http', PORT));
            });
        });
    });
}
