type ActionButtonsType = {
    name: string,
    style: string,
    handleOnClick: () => void
}

type ItemType = {
    keyItem: any,
    title: string,
    subtitle: string,
    actionButtons: ActionButtonsType[]
}

export default function ListItem(props: ItemType) {

    return (
        <li key={props.keyItem} className="px-4 py-2 bg-white hover:bg-gray-50 border-b-2 flex flex-row items-center justify-between">
            <div>
                <p className="font-bold text-dark">{props.title}</p>
                <p className="text-gray-500">{props.subtitle}</p>
            </div>
            <div className="flex flex-row gap-2">
                {props.actionButtons.map((button: ActionButtonsType) => {
                    return (
                        <button
                            key={button.name}
                            className={button.style}
                            onClick={button.handleOnClick}
                        >{button.name}</button>
                    )
                })}
            </div>
        </li>
    )

}