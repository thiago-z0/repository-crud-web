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
    api.post('/repositories', {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": "Rect Native",
      "techs": [
        "Node",
        "Express",
        "TypeScript"
      ]
    }).then(response => {
      setRepositories([...repositories, response.data])
    })
  }


  async function handleRemoveRepository(id) {
    api.delete('/repositories/'+id).then(response => {
      const found = repositories.find(element => element.id === id)

      const index = repositories.indexOf(found)

      const newRepository = repositories

      newRepository.splice(index)

      setRepositories([])
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

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
