import {Router} from 'express';

import {renderApp} from "../controllers";
import {routes} from "../../client/routes";


const allRoutes = (function flatRoutes(routesMap: object): string[] {
    return Object.values(routesMap).reduce<string[]>(
        (routes, path) =>
            routes.concat(typeof path === 'object' ? flatRoutes(path) : path),
        [],
    );
})(routes);

export function appRoutes(router: Router) {
    router.get(allRoutes, renderApp);
}
