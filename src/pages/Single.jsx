import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { theId } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [type, setType] = useState("character");

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/vehicles")) setType("vehicle");
    else if (path.includes("/planets")) setType("planet");
    else setType("character");
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "character") {
          const res = await fetch(`https://akabab.github.io/starwars-api/api/id/${theId}.json`);
          const result = await res.json();
          setData(result);
        } else {
          const res = await fetch(`https://www.swapi.tech/api/${type}s/${theId}`);
          const result = await res.json();
          setData(result.result.properties);
        }
      } catch (err) {
        console.error("Failed to fetch details:", err);
      }
    };

    fetchData();
  }, [theId, type]);

  const renderDetails = () => {
    if (type === "character") {
      return (
        <>
          <p><strong>Gender:</strong> {data.gender || "n/a"}</p>
          <p><strong>Height:</strong> {data.height || "n/a"} cm</p>
          <p><strong>Mass:</strong> {data.mass || "n/a"} kg</p>
          <p><strong>Homeworld:</strong> {data.homeworld || "Unknown"}</p>
          <p><strong>Species:</strong> {data.species || "n/a"}</p>
          <p><strong>Wiki:</strong> <a href={data.wiki} target="_blank" rel="noreferrer" className="text-warning">Open Wiki</a></p>
        </>
      );
    } else if (type === "vehicle") {
      return (
        <>
          <p><strong>Model:</strong> {data.model}</p>
          <p><strong>Manufacturer:</strong> {data.manufacturer}</p>
          <p><strong>Cost:</strong> {data.cost_in_credits} credits</p>
          <p><strong>Passengers:</strong> {data.passengers}</p>
          <p><strong>Class:</strong> {data.vehicle_class}</p>
        </>
      );
    } else if (type === "planet") {
      return (
        <>
          <p><strong>Climate:</strong> {data.climate}</p>
          <p><strong>Terrain:</strong> {data.terrain}</p>
          <p><strong>Population:</strong> {data.population}</p>
          <p><strong>Gravity:</strong> {data.gravity}</p>
          <p><strong>Orbital Period:</strong> {data.orbital_period}</p>
        </>
      );
    }
  };

  const getImageUrl = () => {
    if (type === "character") return data.image;
    if (type === "vehicle")
      return `https://starwars-visualguide.com/assets/img/vehicles/${theId}.jpg`;
    if (type === "planet")
      return `https://starwars-visualguide.com/assets/img/planets/${theId}.jpg`;
    return "";
  };

  return (
    <div className="container text-white mt-5">
      {data ? (
        <div className="row">
          <div className="col-md-5">
            <img
              src={getImageUrl()}
              alt={data.name}
              className="img-fluid rounded shadow border border-warning"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/600x300?text=No+Image")
              }
            />
          </div>
          <div className="col-md-7">
            <h1 className="display-4 text-warning">{data.name}</h1>
            {renderDetails()}
            <Link to="/" className="btn btn-outline-warning mt-3">
              ← Back Home
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5">Loading details...</p>
      )}
    </div>
  );
};



