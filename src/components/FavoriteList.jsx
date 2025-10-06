import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import ConfirmAgregarModal from "./ConfirmAgregarModal.jsx";

const FAVORITES_KEY = "favorites";

const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al cargar favoritos:", error);
    return [];
  }
};



const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error al guardar favoritos:", error);
  }
};

const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_KEY);
};

const FavoriteList = forwardRef((props, ref) => {
  const [favorites, setFavorites] = useState([]);
  const [bookToRemove, setBookToRemove] = useState(null);
  const [lastAddedBook, setLastAddedBook] = useState(null);
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useImperativeHandle(ref, () => ({
    addFavorite(book) {
      const formattedBook = {
        id: book.id || Date.now(),
        title: book.title || "Sin título",
        authors: book.authors || ["Autor desconocido"],
        thumbnail:
          book.thumbnail || "https://via.placeholder.com/150x200?text=Sin+Imagen",
      };

      // Evitar duplicados
      const exists = favorites.some((b) => b.id === formattedBook.id);
      if (!exists) {
        const updatedFavorites = [...favorites, formattedBook];
        setFavorites(updatedFavorites);
        setLastAddedBook(formattedBook);
        setShowConfirmAdd(true);
      }
    },
  }));

  // 🔹 Confirmar y eliminar libro
  const confirmRemove = (book) => {
    setBookToRemove(book);
    setShowConfirmDelete(true);
  };

  const handleRemove = (bookId) => {
    const updatedFavorites = favorites.filter((b) => b.id !== bookId);
    setFavorites(updatedFavorites);
    setBookToRemove(null);
    setShowConfirmDelete(false);
  };

  // 🔹 Limpiar todos
  const handleClearAll = () => {
    clearFavorites();
    setFavorites([]);
  };

  return (
    <section
      id="favoriteList"
      className="scroll-mt-20 pt-28 md:pt-32 bg-base py-16 md:py-10 relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h2 className="text-3xl font-bold mt-10 mb-6">Tus libros favoritos</h2>

      {favorites.length > 0 ? (
        <>
          <button
            onClick={handleClearAll}
            className="mb-6 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-transform"
          >
            Borrar todos los favoritos
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 p-3">
            {favorites.map((book) => (
              <div
                key={book.id}
                className="bg-card p-0 rounded-xl shadow-lg overflow-hidden relative border-border cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4 flex flex-col gap-2 text-center">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    {book.authors.join(", ")}
                  </p>

                  <button
                    onClick={() => confirmRemove(book)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-transform mt-2"
                  >
                    Eliminar de favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-400">No tienes libros favoritos aún.</p>
      )}

      {/* Modal eliminar */}
      {showConfirmDelete && (
        <ConfirmDeleteModal
          book={bookToRemove}
          onConfirm={() => handleRemove(bookToRemove.id)}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}

      {/* Modal agregado */}
      {showConfirmAdd && (
        <ConfirmAgregarModal
          book={lastAddedBook}
          isOpen={showConfirmAdd}
          onClose={() => setShowConfirmAdd(false)}
        />
      )}
    </section>
  );
});

export default FavoriteList;