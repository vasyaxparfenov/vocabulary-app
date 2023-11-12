import { render, screen, within } from '@testing-library/react';
import App from '../App';
import Input from '../Input';

describe("rendering", () => {
    
    it("should render analysis form", () => {
        render(<App />);
      
        const form = screen.getByRole("form", {name: "analysis-form"})
        const textboxes = within(form).queryAllByRole("textbox")
        const button = within(form).getByRole("button", {name: "Submit"})
      
        textboxes.concat(form).concat(button).forEach(element => expect(element).toBeInTheDocument())
    });
})
