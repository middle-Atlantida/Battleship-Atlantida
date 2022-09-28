import prepareRoutes from './prepareRoutes';
import React = require("react");

const routes: React.ReactNode[] = [];

export function extendRoutes(routes: JSX.Element[]) {
    // @ts-ignore
    routes.splice(routes.length, 0, ...prepareRoutes(routes));
}

export function getRoutes() {
    return routes;
}
