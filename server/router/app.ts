import {Router} from 'express';

import {routes} from "../../client/routes";
import {renderApp} from "../controllers";


const allRoutes = (function flatRoutes(routesMap: object): string[] {
    return Object.values(routesMap).reduce<string[]>(
        (routesArray, path) =>
            routesArray.concat(typeof path === 'object' ? flatRoutes(path) : path),
        [],
    );
})(routes);

export function appRoutes(router: Router) {
    router.get(allRoutes, renderApp);
}
