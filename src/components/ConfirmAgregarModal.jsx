import React, { useEffect, useState } from "react";

export default function ConfirmAgregarModal({ book, isOpen, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen && book) {
            setVisible(true);
        }
    }, [isOpen, book]);

    if (!visible || !book) return null;

    const handleClose = () => {
            setVisible(false);
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
            ¡"{book.title}" se ha agregado a tus favoritos!
            </p>
            <div className="flex justify-center">
            <button
                onClick={handleClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Aceptar
            </button>
            </div>
        </div>
        </div>
    );
}
