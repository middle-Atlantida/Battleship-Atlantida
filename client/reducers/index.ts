import {RouterState} from 'connected-react-router';

import { router } from "../../server/router";

export interface BaseStore {
    router: RouterState;
}

export const reducers = {
    router
};
