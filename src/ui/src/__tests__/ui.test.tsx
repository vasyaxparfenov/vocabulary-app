import { render, screen, within } from '@testing-library/react';
import App from '../App';
import FieldLayout from '../FieldLayout';
import Input from '../Input';
import Output from '../Output';

describe("rendering", () => {
    
    it("should render analysis form", () => {
        render(<App />);
      
        const form = screen.getByRole("form", {name: "analysis-form"})
        const textboxes = within(form).queryAllByRole("textbox")
        const button = within(form).getByRole("button", {name: "Submit"})
      
        textboxes.concat(form).concat(button).forEach(element => expect(element).toBeInTheDocument())
    });

    it("should render error when provided", () => {
        const errorMessage = "error"
        
        render(<Output items={[]} error={errorMessage}/>)

        const output = screen.getByText(errorMessage)

        expect(output).toBeInTheDocument()
    })


    it("should render items output when provided", () => {
        const items = ["one", "two", "three"]
        
        render(<Output items={items}/>)

        items.forEach(item => {

            const output = screen.getByText(item)

            expect(output).toBeInTheDocument()
        })
    })

    it("should render input with name when provided", () => {
        const name = "header"
        
        render(<Input name={name}/>)

        const input = screen.getByRole("textbox", {
            name: name
        })

        expect(input).toBeInTheDocument()
    })

    it("should render field layout with header and children when provided", () => {
        const header = "header"
        const text = "text"

        render(
            <FieldLayout header={header}>
                <p>{text}</p>
            </FieldLayout>
        )

        const headerElement = screen.getByText(header)
        const child = screen.getByText(text)


        expect(headerElement).toBeInTheDocument()
        expect(child).toBeInTheDocument()
    })
})
