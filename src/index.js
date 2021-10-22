import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './index.css';

function App() {
    const [result, setResult] = useState([]);
    
    async function getResults(){
      const pythonCode = document.getElementById('inputCodeBox')
        .value
        .toString()
        .replaceAll(`\n`,`-r-n`);
      
        setResult("");

      const res = await fetch(`https://tranquil-woodland-49248.herokuapp.com/api/${pythonCode}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain"
            }            
          })
      const resultFetched = await res.text();
      setResult(resultFetched);
    }
    
    return (
      <div className="App">
        <div className = "header">
          <h3 id = "header-text">PyJs</h3>
        </div>
        <button id = "runCodeButton" onClick = {getResults}>Run</button>
        <div className = "io-box">
          <div className = "input">
            <textarea id="inputCodeBox" rows = "10" spellCheck = "false"/>
          </div>
          <div className = "output">
            <textarea id="outputCodeBox" rows = "10" value = {result} spellCheck = "false" disabled />
          </div>
        </div>
      </div>
    );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);