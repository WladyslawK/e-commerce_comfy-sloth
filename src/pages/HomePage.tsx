import React from 'react';
import FeaturedProducts from "../components/FeaturedProducts";
import {Hero, Services} from "../components";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <main>
      <Hero/>
      <FeaturedProducts/>
      <Services/>
      <Contact/>

    </main>
  );
};

export default HomePage;