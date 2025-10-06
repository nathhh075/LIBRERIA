import React, { useState, useEffect } from "react";

export default function ConfirmDeleteModal({ book, onConfirm }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (book) {
        setVisible(true); 
        }
    }, [book]);

    if (!visible || !book) return null;

    const handleConfirm = () => {
        if (onConfirm) onConfirm(book.id); 
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
            ¿Seguro que quieres eliminar "{book.title}" de favoritos?
            </p>
            <div className="flex justify-center gap-4">
            <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Sí, eliminar
            </button>
            <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
                Cancelar
            </button>
            </div>
        </div>
        </div>
    );
}
