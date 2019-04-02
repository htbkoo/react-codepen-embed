import * as React from 'react';
import {PropsTypes} from "./ReactCodepen";

interface Props extends Pick<PropsTypes, "hash" | "title" | "user"> {
}

function LoadedContent(props: Props) {
    const penLink = `https://codepen.io/${props.user}/pen/${props.hash}/`;
    const userProfileLink = `https://codepen.io/${props.user}`;

    return (
        <div>
            See the Pen <a href={penLink}>{props.title}</a>
            by {props.user} (<a href={userProfileLink}>@{props.user}</a>)
            on <a href="https://codepen.io">CodePen</a>.
        </div>
    );
}

export default LoadedContent;