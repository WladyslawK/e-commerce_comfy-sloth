import React from 'react';
import FeaturedProducts from "../components/FeaturedProducts";
import {Hero} from "../components";

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <FeaturedProducts/>
    </div>
  );
};

export default HomePage;