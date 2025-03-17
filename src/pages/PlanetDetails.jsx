import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

export const PlanetDetails = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/planets/${id}`);
        const data = await res.json();
        setPlanet(data.result.properties);
      } catch (err) {
        console.error("Failed to fetch planet", err);
      }
    };

    fetchPlanet();
  }, [id]);

  return (
    <div className="container text-white mt-5">
      {planet ? (
        <div className="row">
          <div className="col-md-5">
            <img
              src={planetImageMap[planet.name] || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
              alt={planet.name}
              className="img-fluid rounded shadow border border-warning"
            />
          </div>
          <div className="col-md-7">
            <h1 className="display-4 text-warning">{planet.name}</h1>
            <p><strong>Population:</strong> {planet.population}</p>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
            <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
            <Link to="/planets" className="btn btn-outline-warning mt-3">← Back to Planets</Link>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5">Loading planet data...</p>
      )}
    </div>
  );
};

