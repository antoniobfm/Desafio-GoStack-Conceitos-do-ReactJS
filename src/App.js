import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      techs: [
        `NodeJS ${Date.now()}`,
        `VueJS ${Date.now()}`,
        `Express ${Date.now()}`
      ],
      url: `https://github.com/${Date.now()}`,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repositories => repositories.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          { repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            
              <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          ) }
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
