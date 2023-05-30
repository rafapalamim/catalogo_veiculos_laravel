type ValorMonetarioType = {
    valor: number,
    sufixo: string,
    digitos?: number | null
}

export default function ValorMonetario(props: ValorMonetarioType) {

    return (
        <span>{props.sufixo} {props.valor.toLocaleString('pt-br', { minimumFractionDigits: props.digitos ?? 2 })}</span>
    )

}