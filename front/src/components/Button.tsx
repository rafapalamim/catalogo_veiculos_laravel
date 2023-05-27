import React, { MouseEventHandler, PropsWithChildren } from "react"

export enum ButtonColors {
    BLUE = 'bg-blue-500 hover:bg-blue-700 text-white',
    WHITE = "bg-white hover:bg-gray-50 text-dark"
}

interface PropsButton {
    color?: ButtonColors,
    text?: string,
    onClick: MouseEventHandler<HTMLButtonElement>
};

const Button: React.FC<PropsWithChildren<PropsButton>> = (props: PropsButton) => {
    return (
        <button
            className={props.color + " px-4 py-3"}
            onClick={props.onClick}
        >
            {props.text ?? "TEXT"}
        </button>
    )
}

export default Button