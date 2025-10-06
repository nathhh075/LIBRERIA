import React, { useState, useEffect } from "react";
import AddBookModal from "./AddBookModal.jsx";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🟢 1️⃣ Cargar libros guardados en localStorage al iniciar
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
    setBooks(storedBooks);
  }, []);

  // 🟢 2️⃣ Guardar libros cada vez que cambien
  useEffect(() => {
    localStorage.setItem("userBooks", JSON.stringify(books));
  }, [books]);

  // 🟢 3️⃣ Función para agregar un nuevo libro
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  // 🟢 4️⃣ Función para eliminar un libro
  const handleDelete = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <section
      id="home"
      className="scroll-mt-20 pt-28 md:pt-32 bg-base py-16 md:py-20 relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h2 className="text-3xl font-bold mb-6">Mis Libros Agregados</h2>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl mb-6"
      >
        + Agregar Libro
      </button>

      {books.length === 0 ? (
        <p>No has agregado ningún libro.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-card p-0 rounded-xl shadow-lg overflow-hidden relative border-border cursor-pointer hover:scale-105 transition-transform"
            >
              <div>
                <img
                  src="https://via.placeholder.com/150x200?text=Sin+Imagen"
                  alt={book.volumeInfo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 text-center">
                <h3 className="font-semibold text-lg">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.volumeInfo.authors?.join(", ")}
                </p>
                <p className="text-xs text-gray-400">
                  {book.volumeInfo.publishedDate}
                </p>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-transform"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddBookModal
          onAdd={handleAddBook}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}