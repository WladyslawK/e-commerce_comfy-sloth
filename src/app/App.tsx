import React from 'react';
import './App.css';
import {AppRoutes} from "../routing/AppRoutes";
import Navbar from "../components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes/>
    </div>
  );
}

export default App;
