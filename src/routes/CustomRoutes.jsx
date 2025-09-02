import React from "react";
import { Route, Routes } from "react-router-dom";
import Pokedex from "../Component/Pokedex/Pokedex";
import PokemonDetails from "../Component/PokemonDetails/PokemonDetails";
export default function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />}></Route>
      <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
    </Routes>
  );
}
