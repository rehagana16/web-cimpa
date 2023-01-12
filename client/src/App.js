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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/profil' element={< ProfilPeserta />}></Route>
        <Route exact path='/registrasi' element={<Registration/>}></Route>
        <Route exact path='/listPeserta' element={<ListPeserta/>}></Route>
        <Route exact path='/konfirmasi' element={<Konfirmasi/>}></Route>
        <Route exact path='/uploadbuktibayar' element={<UploadBuktiBayar/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
