import React, { useEffect, useState } from "react";

export default function FavoriteList() {
  const [favorites, setFavorites] = useState([]);
  const [newBook, setNewBook] = useState("");

  // 🔹 Cargar libros guardados al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // 🔹 Agregar libro y guardar (como con “Smith”)
  const handleAddFavorite = () => {
    if (!newBook.trim()) return;

    // Leer lista actual
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    // Agregar nuevo libro
    const updated = [...stored, newBook];

    // Guardar lista actualizada
    localStorage.setItem("favorites", JSON.stringify(updated));

    // Actualizar pantalla
    setFavorites(updated);
    setNewBook("");
  };

  // 🔹 Vaciar todos los favoritos
  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <section className="p-10 text-center text-white bg-base min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Mis Libros Favoritos</h1>

      {/* Input para agregar nuevo libro */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Escribe el título del libro..."
          className="px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={handleAddFavorite}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Agregar
        </button>
      </div>

      {/* Botón para borrar todos */}
      {favorites.length > 0 && (
        <button
          onClick={clearFavorites}
          className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Borrar todos los favoritos
        </button>
      )}

      {/* Lista de libros */}
      {favorites.length > 0 ? (
        <ul className="space-y-3 text-lg">
          {favorites.map((book, index) => (
            <li
              key={index}
              className="bg-gray-700 p-3 rounded-lg w-80 mx-auto shadow-md"
            >
              {book}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-lg">No hay libros guardados aún.</p>
      )}
    </section>
  );
}