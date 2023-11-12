import { useState } from 'react';
import { analyse } from './api';
import './App.css';
import TextBox from './TextBox';


function App() {

  let [result, setResult] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const input = form.get("input")!
      .toString()
      .split(" ")

    const result = await analyse(input);

    setResult(result.error ?? result.value.join("<br/>"));
  }

  return (
    <div className="App">
      <form aria-label="analysis-form" className="Form" onSubmit={handleSubmit}>
        <TextBox name="input" headerText="Input text"/>
        <TextBox name="output" headerText="Results" readonly text={result}/>
        <div className="Button">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
