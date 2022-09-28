import React = require("react");
import isServer from "./isServerEnvCheker";

export function renderOnClientSideOnly(
    Component: React.ComponentType,
    props: any,
) {
    if (isServer) {
        return (
            <React.Fragment/>
        );
    }

    return <Component {...props}/>;
}
