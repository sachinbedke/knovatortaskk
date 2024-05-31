import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from './pages/List'

import Checkout from './pages/Checkout'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {
  return <>

    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<List />} />

        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter></>
}

export default App