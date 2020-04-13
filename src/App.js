import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()  => {
      getRepositories()
    }, []);

    async function getRepositories() {
      api.get('/repositories').then(response => {
        setRepositories(response.data)
      })
    }

  async function handleAddRepository() {
    
  }

  async function handleRemoveRepository(id) {
    api.delete('/repositories/'+id).then(response => {
      getRepositories()
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map( repository => 
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
