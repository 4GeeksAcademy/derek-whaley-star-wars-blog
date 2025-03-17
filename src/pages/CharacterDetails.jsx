import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const CharacterDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  if (!data) return <p className="text-light text-center mt-5">Loading character details...</p>;

  return (
    <div className="container text-white mt-5">
      <div className="row">
        <div className="col-md-5">
          <img src={data.image} alt={data.name} className="img-fluid rounded shadow border border-warning" />
        </div>
        <div className="col-md-7">
          <h1 className="display-4 text-warning">{data.name}</h1>
          <p><strong>Gender:</strong> {data.gender || "n/a"}</p>
          <p><strong>Height:</strong> {data.height || "n/a"} cm</p>
          <p><strong>Mass:</strong> {data.mass || "n/a"} kg</p>
          <p><strong>Homeworld:</strong> {data.homeworld || "Unknown"}</p>
          <p><strong>Species:</strong> {data.species || "n/a"}</p>
          <p><strong>Wiki:</strong> <a href={data.wiki} target="_blank" rel="noreferrer" className="text-warning">Open Wiki</a></p>
          <Link to="/" className="btn btn-outline-warning mt-3">← Back Home</Link>
        </div>
      </div>
    </div>
  );
};
