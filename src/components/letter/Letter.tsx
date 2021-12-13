import "./Letter.css"

interface Props {
    id: number;
    value: string,
    active: number,
    activate: Function
}

export default function Letter(props: Props): JSX.Element {

    const className: string = props.id === props.active ? ' active' : ''

    return <div onClick={() => props.activate(props.id)} className={"letter" + className}>{props.value}</div>;
}