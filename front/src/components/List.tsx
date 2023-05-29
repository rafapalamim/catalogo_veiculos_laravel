import { PropsWithChildren } from "react";

export default function List({ children }: PropsWithChildren) {

    return (
        <ul className="flex flex-col">
            {children}
        </ul>
    );

}