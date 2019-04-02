import * as React from 'react';

import LoaderContent from "./LoaderContent";
import {PropsTypes} from "./ReactCodepen";
import LoadedContent from "./LoadedContent";

interface Props extends Pick<PropsTypes, "loader" | "user" | "hash" | "title" | "isLoaded" | "isLoading" | "error"> {
}

function ReactCodepenBody({isLoaded, error, hash, isLoading, loader, title, user}: Props) {
    if (isLoaded) {
        return <LoadedContent hash={hash} user={user} title={title}/>;
    } else if (loader) {
        return <LoaderContent isLoading={isLoading} error={error} loader={loader}/>;
    } else {
        return null;
    }
}

export default ReactCodepenBody;