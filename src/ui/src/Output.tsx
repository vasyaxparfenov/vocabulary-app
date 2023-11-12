import './Output.css' 

interface OutputProps {
    items: string[]
    error?: string
}

export default function Output({items, error}: OutputProps){
    return (
        <div className="Output">
            {
                error ? 
                    (<p>{error}</p>) 
                    : 
                    items?.map((item, index) => (<p key={index}>{item}</p>))
            }
        </div>
    )
}