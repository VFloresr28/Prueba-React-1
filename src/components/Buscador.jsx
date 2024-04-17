import React from 'react';

export default function Buscador({ searchGames, sortGames }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      searchGames(value);
    } else if (name === 'sort') {
      sortGames(value);
    }
  };

  return (
    <div className="row m-0 py-2">
      <div className="col-sm-9 mb-2">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control"
            name="search"
            id="search"
            placeholder="Buscar juegos..."
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="col-sm-3 mb-2">
        <div className="input-group">
          <select
            className="form-select"
            id="sort"
            name="sort"
            onChange={handleInput}
          >
            <option value="">Ordenar por:</option>
            <option value="popularity">Popularidad</option>
            <option value="date_asc">Fecha Lanzamiento ↑</option>
            <option value="date_des">Fecha Lanzamiento ↓</option>
            <option value="az">Alfabéticamente ↑</option>
            <option value="za">Alfabéticamente ↓</option>
          </select>
        </div>
      </div>
    </div>
  );
}