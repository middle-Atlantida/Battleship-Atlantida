import { pathFromFunction } from './pathFromFunctions';

export function model<T>(
    path: (object?: T) => any,
    isRootPath?: boolean,
): string {
    const pathStr = pathFromFunction(path);

    if (!pathStr) {
        return pathStr;
    }

    return pathStr.startsWith('[') || isRootPath ? pathStr : `${pathStr}`;
}
