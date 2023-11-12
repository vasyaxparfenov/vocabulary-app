import "./FieldLayout.css"

interface FieldLayoutProps{
  header: string
  children: any
}

export default function FieldLayout({header, children}: FieldLayoutProps){
    return (
        <div>
          <p className="FieldLayout">{header}</p>
            {children}
        </div>
    )
}