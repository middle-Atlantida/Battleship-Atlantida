import * as React from "react";

const prepareRoutes = (fragments: JSX.Element[]) => {
    return fragments.reduce<React.ReactNode[]>((result, fragment) => {
        React.Children.forEach(fragment.props.children, (subroute: React.ReactNode) => {
            result.push(subroute);
        });

        return result;
    }, []);
};

export default prepareRoutes;
