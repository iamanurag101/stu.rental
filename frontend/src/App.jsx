import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import UserPage from './pages/UserPage';
import ClientErrorPage from './pages/ClientErrorPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/Catalogue' element={<CataloguePage />} />
        <Route path='/User' element={<UserPage />} />
        <Route path='*' element={<ClientErrorPage />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
