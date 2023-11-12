import { useState } from 'react';
import { analyse } from './api';
import './App.css';
import Input from './Input';
import FieldLayout from './FieldLayout';
import Output from './Output';


function App() {

  let [results, setResult] = useState<string[]>([])
  let [error, setError] = useState<string>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const input = form.get("input")!
      .toString()
      .split(" ")

    const result = await analyse(input);

    if(result.error){
      setError(result.error)
      return;
    }

    setResult(result.value)
  }

  return (
    <div className="App">
      <form aria-label="analysis-form" className="Form" onSubmit={handleSubmit}>
      <FieldLayout header="Input Text">
          <Input name="input"/>
      </FieldLayout>
      <FieldLayout header="Results">
          <Output error={error} items={results}/>
      </FieldLayout>
        <div className="Button">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
