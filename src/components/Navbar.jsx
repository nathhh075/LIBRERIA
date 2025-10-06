import React, { useEffect, useState } from "react";
import { Menu, X, Book } from "lucide-react"; 
import { sections } from "../App";
import { ThemeToggle } from "../components/ThemeToggle"; 

function Navbar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white-80 dark:bg-slate-900/80 backdrop-blur border-b transition dark:hover:text-primary${
        elevated ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between">
   
        <a
          href="#inicio"
          className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100 "
        >
          <Book className="size-5 " /> 
          <span>LIBRARY</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 ml-auto">
          {sections.map(
            (s) =>
              s.label && (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-slate-100 dark:text-slate-200 hover:text-slate-1000 dark:hover:text-white px-1"
                  >
                    {s.label}
                  </a>
                </li>
              )
          )}
        </ul>

        {/* Botón Dark Mode */}
        <div className="ml-4">
          <ThemeToggle />
        </div>

        {/* Botón móvil */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Links en móvil */}
      {open && (
        <div className="md:hidden border-t bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <ul className="flex flex-col gap-3">
              {sections.map(
                (s) =>
                  s.label && (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setOpen(false)}
                        className="block py-1 text-white hover:text-slate-300" 
        
                      >
                        {s.label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
