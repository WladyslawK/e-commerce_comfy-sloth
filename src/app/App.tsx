import React from 'react';
import {AppRoutes} from "../routing/AppRoutes";
import {Navbar} from "../components";
import {Footer} from "../components";

function App() {
  return (
    <div>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
