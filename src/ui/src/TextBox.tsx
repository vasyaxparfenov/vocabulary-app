import './TextBox.css'

interface TextBoxProps {
    name: string
    headerText: string
    readonly?: boolean
    text?: string
}

export default function TextBox(props: TextBoxProps){
    return (
        <div>
            <p className="InputHeader">{props.headerText}</p>
            <textarea 
                aria-label={props.name}
                name={props.name}
                className="TextArea" 
                readOnly={props.readonly}
                value={props.text}/>                
        </div>
    );
}