import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from 'react-router-dom';
import Registration from "./Pages/Registration";
import ProfilPeserta from "./Pages/ProfilPeserta";
import ListPeserta from "./Pages/ListPeserta";
import Konfirmasi from "./Pages/Konfirmasi";
import Login from "./Pages/Login";
import UploadBuktiBayar from "./Pages/UploadBuktiBayar";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/dashboard' element={< Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
