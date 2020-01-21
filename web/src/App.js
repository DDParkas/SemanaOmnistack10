import React, { useEffect, useState } from 'react';
import api from './services/api.js'
// Componente -> Componente é uma função que retorna um conteudo html, css, js que não interfere no restante da aplicação
// Propiedade -> São os atributos do HTML que o componente pai passa para o componente filho
// Estado     ->  Informações mantidas pelo componente -- Imutabilidade
import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'
import DevForm from './componnents/DevForm'
import DevItem from './componnents/DevItem'

function App() {
  const [devs, setDevs ] = useState([])
 
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()

  },[])

 

  async function handleAddDev(data){
   

    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data])
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
        

      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
             <DevItem key={dev._id} dev={dev}/>
             
          ))}
               
        </ul>
      </main>
    </div>
  )
}

export default App;
