import React from 'react';

type ImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string | undefined;
};

export const Image = ({
    src,
    alt,
    width,
    height,
    className,
}: ImageProps) => (
    <img src={src} width={width} height={height} alt={alt} className={className}/>
);
