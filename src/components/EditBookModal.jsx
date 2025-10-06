export default function EditBookModal({ book, onClose, onSave }) {
  const [editedBook, setEditedBook] = useState(book);

  useEffect(() => setEditedBook(book), [book]);

  if (!book) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({
      ...prev,
      [name]: name === "authors" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedBook);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Libro</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={editedBook.title} onChange={handleChange} />
          <input
            name="authors"
            value={editedBook.authors.join(", ")}
            onChange={handleChange}
          />
          <input
            name="publishedDate"
            value={editedBook.publishedDate}
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
