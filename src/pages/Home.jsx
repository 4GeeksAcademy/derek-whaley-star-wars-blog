import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
      const data = await res.json();
      dispatch({ type: "SET_CHARACTERS", payload: data });
    };

    fetchCharacters();
  }, [dispatch]);

  return (
    <div className="container text-white">
      <h1 className="text-warning mt-5 mb-4">Characters</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {store.characters.map((char) => (
          <div
            className="card bg-dark text-light m-3 border border-warning"
            key={char.id}
            style={{ width: "18rem" }}
          >
            <img
              src={char.image}
              className="card-img-top"
              alt={char.name}
              style={{ height: "250px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/400x250")}
            />
            <div className="card-body">
              <h5 className="card-title">{char.name}</h5>
              <p className="card-text">
                Gender: {char.gender || "n/a"}<br />
                Height: {char.height || "n/a"}<br />
                Homeworld: {char.homeworld || "Unknown"}
              </p>
              <div className="d-flex justify-content-between">
                <Link to={`/characters/${char.id}`} className="btn btn-outline-light">
                  Learn more!
                </Link>
                <button
                  className={`btn ${
                    store.favorites.includes(char.name) ? "btn-warning text-dark" : "btn-outline-warning"
                  }`}
                  onClick={() =>
                    store.favorites.includes(char.name)
                      ? dispatch({ type: "REMOVE_FAVORITE", payload: char.name })
                      : dispatch({ type: "ADD_FAVORITE", payload: char.name })
                  }
                  title={store.favorites.includes(char.name) ? "Remove from favorites" : "Add to favorites"}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



