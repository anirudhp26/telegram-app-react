import React from "react";
import { useSelector } from 'react-redux';
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  const isToken = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route element={isToken ? <Home/> : <Login />} path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
