import React, { MouseEventHandler, PropsWithChildren } from "react"

interface LinkProps {
    text: string,
    onClick: MouseEventHandler<HTMLAnchorElement>,
    className: string
}

const Link: React.FC<PropsWithChildren<LinkProps>> = (props: LinkProps) => {
    return (
        <a
            className={props.className}
            onClick={props.onClick}
        >
            {props.text}
        </a>
    )
}

export default Link