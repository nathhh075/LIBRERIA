import React, { useState, useEffect, useRef } from "react";
import ApiBooks from "../services/ApiBooks.jsx";
import FavoriteList from "./FavoriteList.jsx";
import { Star, Search as SearchIcon } from "lucide-react"; // importamos el ícono

export default function Buscar() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("Fantasy");
    const favoriteListRef = useRef(); // referencia para agregar favoritos

    const apiBooks = new ApiBooks();

    useEffect(() => {
        if (query.trim() !== "") {
        apiBooks.searchBooks(query).then(setBooks);
        }
    }, [query]);

    const visibleBooks = [...books].sort(() => 0.5 - Math.random()).slice(0, 8);

    return (
        <section 
            id = "buscar"
            className="scroll-mt-20 pt-28 md:pt-32 bg-base py-16 md:py-20 relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="min-h-screen bg-background p-6 text-primary w-full max-w-6xl">
            <h1 className="text-3xl font-bold text-center mb-6">
            Busca tus libros aquí...
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex justify-center mb-10 w-full">
            <div className="relative w-full max-w-xl">
                <input
                type="text"
                placeholder="Buscar libro..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-card text-foreground placeholder-gray-400 border-border rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                onClick={() => apiBooks.searchBooks(query).then(setBooks)}
                className="absolute right-1 top-1/2 -translate-y-1/2 cosmic-button px-4 py-4 rounded-full text-sm"
                >
                <SearchIcon className="w-5 h-5" />
                </button>
            </div>
            </div>

            {/* Lista de libros */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
            {visibleBooks.map((book) => (
                <div
                key={book.id}
                className="bg-card p-0 rounded-xl shadow-lg overflow-hidden relative border-border cursor-pointer hover:scale-105 transition-transform"
                >
                <div>
                    <img
                    src={book.thumbnail || "https://via.placeholder.com/150x200?text=Sin+Imagen"}
                    alt={book.title || "Sin título"}
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="p-4 flex flex-col gap-2 text-center relative">
                    <h3 className="font-semibold text-lg">{book.title || "Sin título"}</h3>
                    <p className="text-sm text-gray-600">
                    {book.authors ? book.authors.join(", ") : "Autor desconocido"}
                    </p>

                    {/* Botón para agregar a favoritos */}
                    <button
                    onClick={() => favoriteListRef.current?.addFavorite(book)}
                    className="absolute bottom-2 left-2 z-10 text-yellow-500 hover:scale-110 transition-transform"
                    >
                    <Star size={28} />
                    </button>
                </div>
                </div>
            ))}
            </div>
            <FavoriteList ref={favoriteListRef} />
        </div>
        </section>
    );
    }
