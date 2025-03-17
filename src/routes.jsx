// Import necessary components and functions from react-router-dom.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Vehicles } from "./pages/Vehicles";
import { Planets } from "./pages/Planets";
import { CharacterDetails } from "./pages/CharacterDetails";
import { VehicleDetails } from "./pages/VehicleDetails";
import { PlanetDetails } from "./pages/PlanetDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1 className="text-warning text-center mt-5">404 - Page Not Found</h1>}>
      <Route index element={<Home />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="planets" element={<Planets />} />
      <Route path="characters/:id" element={<CharacterDetails />} />
      <Route path="vehicles/:id" element={<VehicleDetails />} />
      <Route path="planets/:id" element={<PlanetDetails />} />
    </Route>
  )
);


