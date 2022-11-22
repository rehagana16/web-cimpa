import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from 'react-router-dom';
// import Registration from "./Pages/Registration";
import ProfilPeserta from "./Pages/ProfilPeserta";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< ProfilPeserta />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
