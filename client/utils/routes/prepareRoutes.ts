import React from "react";

export const prepareRoutes = (fragments: JSX.Element[]) => fragments.reduce<React.ReactNode[]>((result, fragment) => {
    React.Children.forEach(fragment.props.children, (subroute: React.ReactNode) => {
        result.push(subroute);
    });

    return result;
}, []);
