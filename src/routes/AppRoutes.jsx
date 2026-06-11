import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DIYProducts from '../pages/DIYProducts';
import Workshops from '../pages/Workshops';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<DIYProducts />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/workshops" element={<Workshops />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;