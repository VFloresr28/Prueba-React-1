import React from 'react';
import { useState, useEffect } from 'react';
import Buscador from './Buscador';
import './MyApi.css';

const API_KEY = 'a2fee76310mshf6fbdd91216cb8ep1bb156jsn128258abf7c0';
const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
const ICONS = {
  'Web Browser': 'fa-solid fa-window-maximize fa-lg',
  'Windows': 'fa-brands fa-windows fa-lg'
};

export default function MiApi() {
  const [dataGames, setDataGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    const url = `https://${API_HOST}/api/games`;
    const options = {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(setDataGames)
      .catch(error => console.error('Hubo un problema con la petición: ' + error.message));
  };

  const sortedFilteredGames = () => {
    return dataGames
      .filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
      .sort(getSortFunction(sort));
  };

  const getSortFunction = (sortCriteria) => {
    switch (sortCriteria) {
      case 'date_asc':
        return (a, b) => new Date(a.release_date) - new Date(b.release_date);
      case 'date_des':
        return (a, b) => new Date(b.release_date) - new Date(a.release_date);
      case 'az':
        return (a, b) => a.title.localeCompare(b.title);
      case 'za':
        return (a, b) => b.title.localeCompare(a.title);
      default:
        return () => 0;
    }
  };

  return (
    <main>
      <Buscador searchGames={setSearch} sortGames={setSort} />
      <div className="games row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {sortedFilteredGames().map(game => (
          <div key={game.id} className="col">
            <div className="card h-100">
              <a href={game.game_url} title="Ir al juego por más detalles">
                <img src={game.thumbnail} className="card-img-top" alt={'Foto de ' + game.title} />
              </a>
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{game.short_description.slice(0, 50) + '...'}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">{game.release_date}</small>
                <span className="badge bg-secondary">{game.genre}</span>
                <i className={ICONS[game.platform] || ICONS['Windows']} title={game.platform}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}