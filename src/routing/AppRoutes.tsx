import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../utils/routePaths.enum";
import {ProductsPage} from "../pages/ProductsPage";
import {About, Home} from "../pages";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PATH.HOME} />} />
        <Route path={PATH.HOME} element={<Home/>}/>
        <Route path={PATH.ABOUT} element={<About/>} />
        <Route path={PATH.PRODUCTS} element={<ProductsPage/>} />
        <Route path={PATH.PRODUCTS} element={<ProductsPage/>} />
      </Routes>
    </>
  );
};