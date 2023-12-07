import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import { JSX } from 'solid-js';
import './index.less';

type Props = {
    visible?: boolean;
    zIndex?: number;
    onClick?: (e: any) => void;
    children?: JSX.Element;
    style?: JSX.CSSProperties;
}

const Overlay: Component<Props> = props => {
    const {visible} = props;
    const style = createMemo(() => ({
        ...props.style,
        display: props.visible ? 'flex' : 'none'
    }))
    return (
        <div
            class='overlay'
            style={style()}
            onClick={e => {
                if (e.target === e.currentTarget) {
                    props.onClick?.(e)
                }
            }}
        >
            {props.children}
        </div>
    )
}

export default Overlay;