import React from 'react';

type IArrowLeftProps = {
    color?: string;
    width?: number;
    height?: number;
};

export const ArrowLeft = ({ color = 'white', width = 24, height = 24 }: IArrowLeftProps) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
