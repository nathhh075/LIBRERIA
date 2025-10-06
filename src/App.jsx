import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Buscar from './components/Buscar'
import AddBookModal from './components/AddBookModal'
import FavoriteList from './components/FavoriteList'
import libraryBg from "./assets/img/librerias.jpg";
import LocalStorageTest from "./components/LocalStorageTest";


const sections = [
  {id: "inicio", label: "Inicio"}, 
  {id: "buscar", label: "Buscar"},
  {id: "listaFavs", label: "Favoritos"},

];

function App() {
  return (
    <div className='scroll-smooth text-slate-800 '
    
    >   
    <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat brightness-10 opacity-20 animate-fade-in"
        style={{
          backgroundImage: `url(${libraryBg})`,
        }}
      ></div>


      {<Navbar />}
      {<Home />}
      {<Buscar/>}
      {<FavoriteList/>}
      {<Footer />}     
      
    </div>
  )
}

export default App
export {sections}
