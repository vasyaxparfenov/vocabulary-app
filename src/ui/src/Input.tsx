import './Input.css'

interface InputProprs {
    name: string
}

export default function Input(props: InputProprs){
    return (
        <textarea 
            aria-label={props.name}
            name={props.name}
            className="TextArea"/>                
    );
}