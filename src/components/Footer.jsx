function Footer() {
  return (
    <footer className="bg-card/30 backdrop-blur-md w-full py-6 md:py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-foreground opacity-80">
        
        {/* Descripción y redes */}
        <p className="mb-2 md:mb-0 text-center md:text-left">
         Encuéntranos en{" "}
          <a 
            href="https://instagram.com/ntha._r" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-primary hover:opacity-80 transition"
          >
            Instagram
          </a>{" "}
          y{" "}
          <a 
            href="https://www.behance.net/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-primary hover:opacity-80 transition"
          >
            Behance
          </a>. <br />
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>

        {/* Enlace arriba */}
        <a 
          href="#inicio" 
          className="font-semibold text-primary hover:opacity-80 transition"
        >
          ↑ Volver al inicio
        </a>
      </div>
    </footer>
  );
}

export default Footer;
