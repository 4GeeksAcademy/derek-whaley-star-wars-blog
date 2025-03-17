import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const vehicleImageMap = {
  "Sand Crawler": "https://static.wikia.nocookie.net/starwars/images/f/ff/Sandcrawler.png/revision/latest?cb=20130812001443",
  "X-34 landspeeder": "https://pixiedustfan.com/wp-content/uploads/2017/07/Luke-Skywalker-landspeeder.jpg",
  "T-16 skyhopper": "https://static.wikia.nocookie.net/starwars/images/4/4d/T16skyhopper_negvv.png/revision/latest?cb=20170411234939",
  "TIE/LN starfighter": "https://static.wikia.nocookie.net/starwars/images/9/92/TIEfighter2-Fathead.png/revision/latest?cb=20161109040841",
  "Snowspeeder": "https://static.wikia.nocookie.net/starwars/images/2/27/Rebel_snowspeeder_SWL.png/revision/latest?cb=20250209182658",
  "AT-AT": "https://static.wikia.nocookie.net/starwars/images/1/16/AT-AT_2_Fathead.png/revision/latest/scale-to-width-down/1200?cb=20161108042721",
  "TIE bomber": "https://static.wikia.nocookie.net/starwars/images/1/17/TIE_Bomber_BF2.png/revision/latest?cb=20230720014331",
  "AT-ST": "https://static.wikia.nocookie.net/starwars/images/f/ff/ATST-SWBdice.png/revision/latest?cb=20230723050455",
  "Storm IV Twin-Pod cloud car": "https://static.wikia.nocookie.net/starwars/images/3/3b/Cloud-car-v2.png/revision/latest?cb=20160617064429",
  "Sail barge": "https://static.wikia.nocookie.net/starwars/images/d/db/Sailbarge_negvv.png/revision/latest?cb=20170411231907"
};

export const Vehicles = () => {
  const { store, dispatch } = useGlobalReducer();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("https://www.swapi.tech/api/vehicles");
        const data = await res.json();

        const details = await Promise.all(
          data.results.slice(0, 10).map(async (vehicle) => {
            const res = await fetch(vehicle.url);
            const detail = await res.json();
            return { ...detail.result.properties, uid: detail.result.uid };
          })
        );

        setVehicles(details);
      } catch (err) {
        console.error("Failed to load vehicles", err);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="container mt-4 text-light">
      <h2 className="text-warning mb-4">Vehicles</h2>
      <div className="row">
        {vehicles.map((vehicle) => (
          <div className="col-md-4 mb-4" key={vehicle.uid}>
            <div className="card bg-dark text-light border border-warning h-100">
              <img
                src={vehicleImageMap[vehicle.name] || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                className="card-img-top"
                alt={vehicle.name}
              />
              <div className="card-body">
                <h5 className="card-title">{vehicle.name}</h5>
                <p className="card-text">Model: {vehicle.model}</p>
                <p className="card-text">Passengers: {vehicle.passengers}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/vehicles/${vehicle.uid}`} className="btn btn-warning">Learn more!</Link>
                  <button
                    className={`btn ${store.favorites.includes(vehicle.name) ? "btn-warning text-dark" : "btn-outline-warning"}`}
                    onClick={() =>
                      store.favorites.includes(vehicle.name)
                        ? dispatch({ type: "REMOVE_FAVORITE", payload: vehicle.name })
                        : dispatch({ type: "ADD_FAVORITE", payload: vehicle.name })
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






