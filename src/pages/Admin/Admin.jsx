import React from "react";
import { Route, Routes } from "react-router-dom";
import Graph from "./Graph";
import Grid from "./Grid";

const Admin = () => {
  return (
    <Routes>
      <Route
        path="/"
        index
        element={<p>To go to graph or grid pages select from admin dropdown</p>}
      />
      <Route path="graph" element={<Graph />} />
      <Route path="grid" element={<Grid />} />
    </Routes>
  );
};

export default Admin;
