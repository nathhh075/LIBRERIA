import React from "react";
import { SearchIcon, Heart } from "lucide-react";


export default function Hero() {
  return (
    
    <section
      id="inicio"
      className="scroll-mt-20 pt-28 md:pt-32 bg-base py-16 md:py-20 relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span className="opacity-0 animate-fade-in">Library </span>
          <span className="text-primary opacity-0 animate-fade-in-delay-2">{" "}Welcome</span>
        </h1>
        <p className="mt-4 text-lg text-white opacity-0 max-w-2xl mx-auto text-gradient ml-2 opacity-0 animate-fade-in-delay-3">
          Explora nuestra colección de libros y guarda tus favoritos para leer más tarde.
        </p>

        <div className=" mt-6 flex flex-col sm:flex-row gap-4 justify-center text-gradient ml-2 opacity-0 animate-fade-in-delay-4 " >
          <a
            href="#buscar"
            className="opacity-70 inline-flex items-center rounded-2xl px-5 py-3 border border-border text-white hover:bg-card"
          >
            <SearchIcon className="size-5" /> {" "} Buscar Libros

          </a>
          <a
            href="#listaFavs"
            className="opacity-70 inline-flex items-center rounded-2xl px-5 py-3 border border-border text-white hover:bg-card"
          >
            <Heart className="size-5" /> {" "} Mis Favoritos
          </a>
        </div>
      </div>
    </section>
  );
}
