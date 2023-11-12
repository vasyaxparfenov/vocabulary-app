import { render, screen, within } from '@testing-library/react';
import App from '../App';
import TextBox from '../TextBox';

describe("rendering", () => {
    
    it("should render analysis form", () => {
        render(<App />);
      
        const form = screen.getByRole("form", {name: "analysis-form"})
        const textboxes = within(form).queryAllByRole("textbox")
        const button = within(form).getByRole("button", {name: "Submit"})
      
        textboxes.concat(form).concat(button).forEach(element => expect(element).toBeInTheDocument())
    });

    it("should render textbox with header", () => {
        
        const header = "header"
        
        render(<TextBox headerText={header} name="test"/>)

        const textbox = screen.getByRole("textbox")
        const headerElement = screen.getByText(header)

        const elements = [textbox, headerElement];

        elements.forEach(element => expect(element).toBeInTheDocument())

    })

    it("should render readonly textbox", () => {
        render(<TextBox headerText="test" name="test" readonly/>)

        const textbox = screen.getByRole("textbox")

        expect(textbox).toHaveAttribute("readonly")

    })

    it("should render textbox with text", () => {

        const text = "text"

        render(<TextBox headerText="test" name="test" readonly text={text}/>)

        const textbox = screen.getByRole("textbox")

        expect(textbox).toHaveTextContent(text)
    })
})
