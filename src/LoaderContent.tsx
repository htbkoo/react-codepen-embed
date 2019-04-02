import * as React from 'react';
import {PropsTypes} from "./ReactCodepen";

interface Props extends Pick<PropsTypes, "error" | "isLoading" | "loader"> {
}

function LoaderContent({error, isLoading, loader,}: Props) {
    return React.createElement(loader, {isLoading, error});
}

export default LoaderContent;