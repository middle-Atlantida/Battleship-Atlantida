import React from 'react';

import { prepareRoutes } from './prepareRoutes';

const routes: React.ReactNode[] = [];

export function extendRoutes(argRoutes: JSX.Element[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    argRoutes.splice(argRoutes.length, 0, ...prepareRoutes(routes));
}

export function getRoutes() {
    return routes;
}
