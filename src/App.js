import React, { useState } from 'react';
import logo from './logo.svg';
import copy from "copy-to-clipboard"
import './App.css';

function App() {
  const [url, setUrl] = useState('')
  const [urlFinal, setUrlFinal] = useState('')
  const [hits, setHits] = useState('')
  const [acessos, setAcessos] = useState('')
  const [urlDados, setUrlDados] = useState('')
  const [codigo, setCodigo] = useState('')
  const [escondido, setEscondido] = useState(true)
  const baseUrl = 'https://dclrs.herokuapp.com'
  
  
  const copyToClipboard = () => {
    copy(urlFinal);
 }
 const handleSubmit2 = async (event) => {
  event.preventDefault()
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const resultado = await fetch(`${baseUrl}/${codigo}/stats`, requestOptions)
      .then(response => response.json())
      .then(data => data);

  console.log(resultado)
  setHits(resultado.hits)
  setAcessos(resultado.updatedAt)

  setUrlDados(baseUrl + '/' + resultado.code)
  setEscondido(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (url.includes('https://') || url.includes('http://')){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      };
      const resultado = await fetch(`${baseUrl}/encurtador`, requestOptions)
          .then(response => response.json())
          .then(data => data);
      console.log(resultado)
      setUrlFinal(baseUrl + '/' + resultado.code)

      
    } 
    else{
      alert('Insira uma url com http ou https')
    }
    
  
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="370" height="370" />
      </header>
      <body className="App-body">
        
      
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='Insira a URL'
            className="App-input"
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        <input className="App-button" type="submit" />
        </form>
        <div className="copyTest">
          <input type="text" value={urlFinal} className="App-input2" disabled="true" placeholder='Nova URL'/>      
          <button onClick={copyToClipboard} className="App-button">Copiar link</button>
        </div>
        <div className="dadosUrl">
          <h4>Dados de URL</h4>
          <form onSubmit={handleSubmit2}>
          <input 
            placeholder='Insira o código'
            className="App-input3"
            type="text" 
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input className="App-button" type="submit" value="Ver dados"/>
        </form>
          <table className='tabela' hidden={escondido}>
            <tr>
              <th>Url:</th>
              <td>{urlDados}</td>
            </tr>
            <tr>
              <th>Quantidade de Acessos:</th>
              <td>{hits}</td>
            </tr>
            <tr>
              <th>Último acesso:</th>
              <td>{acessos}</td>
            </tr>
          </table>
        </div>


      </body>
    </div>
  );
}

export default App;

