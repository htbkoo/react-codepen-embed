import * as React from 'react';
import {Component, ComponentClass, FunctionComponent} from 'react';

import CodepenEmbedScriptTagBuilder, {ScriptTagBuilder} from "./CodepenEmbedScriptTagBuilder";
import ReactCodepenBody from "./ReactCodepenBody";

type ErrorType = string;

export interface LoaderProps {
    isLoading: boolean,
    error: ErrorType
}

type Loader = FunctionComponent<LoaderProps> | ComponentClass<LoaderProps> | string;

export interface PropsTypes {
    user: string,
    hash: string,

    defaultTab: string,
    height: number,
    preview: boolean,
    themeId: string | number,
    version: number,
    shouldLoadScript: boolean,

    loader?: Loader,
    title?: string,
    overrideAsLoaded?: boolean

    isLoaded: boolean,
    isLoading: boolean,
    error?: ErrorType,
}

export interface ReactCodepenProps extends Pick<PropsTypes, "user" | "hash" | "defaultTab" | "height" | "preview" | "themeId" | "version" | "loader" | "title" | "shouldLoadScript" | "overrideAsLoaded"> {
}

interface ReactCodepenState {
    loaded: boolean,
    loading: boolean,
    error?: ErrorType,
}

class ReactCodepen extends Component<ReactCodepenProps, ReactCodepenState> {
    private _mounted: boolean;
    private scriptTagBuilder: ScriptTagBuilder;

    static defaultProps = {
        defaultTab: 'css,result',
        height: 300,
        preview: true,
        themeId: 'dark',
        version: 2,
        shouldLoadScript: true
    };

    state = {loaded: false, loading: true, error: undefined};

    constructor(props: ReactCodepenProps, context) {
        super(props, context);

        this.scriptTagBuilder = new CodepenEmbedScriptTagBuilder()
            .setAsync(true)
            .withOnLoadHandler(this.handleScriptLoad.bind(this))
            .withOnErrorHandler(this.handleScriptError.bind(this));
    }

    componentDidMount() {
        this._mounted = true;

        if (this.props.shouldLoadScript) {
            // load the codepen embed script
            this.scriptTagBuilder.appendTo(document.body);
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        const {height, themeId, title, user, hash, defaultTab, preview, version, loader} = this.props;
        return (
            <div
                data-height={height}
                data-theme-id={themeId}
                data-slug-hash={hash}
                data-default-tab={defaultTab}
                data-user={user}
                data-embed-version={version}
                data-pen-title={title}
                data-preview={preview}
                className="codepen"
            >
                <ReactCodepenBody
                    user={user}
                    hash={hash}
                    loader={loader}
                    title={title}
                    isLoaded={this.isLoaded()}
                    isLoading={this.state.loading}
                    error={this.state.error}
                />
            </div>
        );
    }

    private isLoaded() {
        return this.props.overrideAsLoaded || this.state.loaded;
    }

    private handleScriptLoad() {
        // do not do anything if the component is already unmounted.
        if (!this._mounted) return;

        this.setState({
            loaded: true,
            loading: false
        });
    }

    private handleScriptError() {
        if (!this._mounted) return;

        this.setState({
            error: 'Failed to load the pen'
        });
    }
}

export default ReactCodepen;