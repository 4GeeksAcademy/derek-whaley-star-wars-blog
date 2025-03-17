import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

export const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
        const data = await res.json();
        setVehicle(data.result.properties);
      } catch (err) {
        console.error("Failed to fetch vehicle", err);
      }
    };

    fetchVehicle();
  }, [id]);

  return (
    <div className="container text-white mt-5">
      {vehicle ? (
        <div className="row">
          <div className="col-md-5">
            <img
              src={vehicleImageMap[vehicle.name] || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
              alt={vehicle.name}
              className="img-fluid rounded shadow border border-warning"
            />
          </div>
          <div className="col-md-7">
            <h1 className="display-4 text-warning">{vehicle.name}</h1>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
            <p><strong>Cost:</strong> {vehicle.cost_in_credits} credits</p>
            <p><strong>Passengers:</strong> {vehicle.passengers}</p>
            <p><strong>Crew:</strong> {vehicle.crew}</p>
            <p><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</p>
            <Link to="/vehicles" className="btn btn-outline-warning mt-3">← Back to Vehicles</Link>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5">Loading vehicle data...</p>
      )}
    </div>
  );
};


