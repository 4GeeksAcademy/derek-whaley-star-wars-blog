import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const planetImageMap = {
  "Tatooine": "https://static.wikia.nocookie.net/theclonewiki/images/b/b4/Tatooine-TCW.png/revision/latest?cb=20230819004008",
  "Alderaan": "https://upload.wikimedia.org/wikipedia/en/6/60/Alderaan250ppx.PNG",
  "Yavin IV": "https://static.wikia.nocookie.net/starwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20181015023938",
  "Hoth": "https://static.wikia.nocookie.net/starwars/images/1/1d/Hoth_SWCT.png/revision/latest?cb=20160630022322",
  "Dagobah": "https://upload.wikimedia.org/wikipedia/en/1/1c/Dagobah.jpg",
  "Bespin": "https://static.wikia.nocookie.net/starwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170222012550",
  "Endor": "https://static.wikia.nocookie.net/starwars/images/e/e5/Endor-SWCT.png/revision/latest?cb=20240127220646",
  "Naboo": "https://static.wikia.nocookie.net/starwars/images/f/f0/Naboo_planet.png/revision/latest?cb=20241209035543",
  "Coruscant": "https://static.wikia.nocookie.net/starwars/images/1/16/Coruscant-EotE.jpg/revision/latest?cb=20240118012902",
  "Kamino": "https://static.wikia.nocookie.net/starwars/images/5/52/Kamino-DB.png/revision/latest?cb=20150920190527"
};

export const Planets = () => {
  const { store, dispatch } = useGlobalReducer();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch("https://www.swapi.tech/api/planets");
        const data = await res.json();

        const details = await Promise.all(
          data.results.slice(0, 10).map(async (planet) => {
            const res = await fetch(planet.url);
            const detail = await res.json();
            return { ...detail.result.properties, uid: detail.result.uid };
          })
        );

        setPlanets(details);
      } catch (err) {
        console.error("Failed to load planets", err);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div className="container mt-4 text-light">
      <h2 className="text-warning mb-4">Planets</h2>
      <div className="row">
        {planets.map((planet) => (
          <div className="col-md-4 mb-4" key={planet.uid}>
            <div className="card bg-dark text-light border border-warning h-100">
              <img
                src={planetImageMap[planet.name] || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                className="card-img-top"
                alt={planet.name}
              />
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text">Climate: {planet.climate}</p>
                <p className="card-text">Population: {planet.population}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/planets/${planet.uid}`} className="btn btn-warning">Learn more!</Link>
                  <button
                    className={`btn ${store.favorites.includes(planet.name) ? "btn-warning text-dark" : "btn-outline-warning"}`}
                    onClick={() =>
                      store.favorites.includes(planet.name)
                        ? dispatch({ type: "REMOVE_FAVORITE", payload: planet.name })
                        : dispatch({ type: "ADD_FAVORITE", payload: planet.name })
                    }
                  >❤️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};






