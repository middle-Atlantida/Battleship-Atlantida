/* eslint-disable import/no-default-export */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="node" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.mp3' {
    const src: string;
    export default src;
}

interface Indexed<T = any> {
    [x: string]: T;
}

export type Nullable<T> = T | null | undefined;

export type NullOrString = Nullable<string>;

export type PlainObject<T = unknown> = Record<string, T>;

export type Keys<T extends PlainObject> = keyof T;
export type Values<T extends PlainObject> = T[Keys<T>];
