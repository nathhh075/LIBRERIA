export default class ApiBooks {
    constructor() {
      //api de  Google Books
      this.apiBaseUrl = "https://www.googleapis.com/books/v1/volumes";

      // (para mostrar libros directamente)
      this.viewerScript = "https://www.google.com/books/jsapi.js";

      // Carga la API del visor de Google Books si aún no está cargada
      if (!window.google || !window.google.books) {
        const script = document.createElement("script");
        script.src = this.viewerScript;
        script.async = true;
        document.body.appendChild(script);
      }
    }

    /**
     * Busca libros por palabra clave
     * @param {string} query 
     * @returns {Promise<Array>} 
     */
    async searchBooks(query = "novel") {
      try {
        const response = await fetch(`${this.apiBaseUrl}?q=${encodeURIComponent(query)}&maxResults=10`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (!data.items) return [];

        // Mapeamos los datos para obtener solo lo necesario
        return data.items.map((item) => {
          const info = item.volumeInfo;

          return {
              id: item.id,
              title: info.title || "Título no disponible",
              authors: info.authors || ["Autor desconocido"],
              publishedDate: info.publishedDate || "Sin fecha",
              thumbnail: info.imageLinks?.thumbnail || "https://via.placeholder.com/128x200?text=Sin+Imagen",
              description: info.description || "Sin descripción disponible.",
              previewLink: info.previewLink || "#",
              industryIdentifiers: info.industryIdentifiers || [],
          };
        });
      } catch (error) {
        console.error(" Error al buscar libros:", error);
        return [];
      }
    }

    /**
     *  Muestra el visor embebido de Google Books dentro de un div.
     * @param {string} bookId - ID del libro o ISBN
     * @param {string} containerId - ID del elemento HTML donde se mostrará el visor
     */
    loadBookPreview(bookId, containerId) {
      if (!window.google || !window.google.books) {
        console.warn("La API de Google Books no está cargada aún.");
        return;
      }

      const viewer = new window.google.books.DefaultViewer(document.getElementById(containerId));
      viewer.load(bookId, () => alert("No se pudo cargar la vista previa "), () =>
        console.log(" Vista previa cargada correctamente")
      );
    }
  }