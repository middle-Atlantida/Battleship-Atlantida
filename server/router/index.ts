import {Router} from 'express';

import {appRoutes} from './app';
import {staticRoutes} from './static';

export const router: Router = Router();

appRoutes(router);
staticRoutes(router);

