import { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    className?: string | undefined;
    src: string;
    alt: string;
};

export const Image = ({ src, alt, className, ...props }: ImageProps) => (
    <img className={className} src={src} alt={alt} {...props} />
);
