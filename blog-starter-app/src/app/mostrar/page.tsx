import React from "react";

interface Mensaje {
  id: number;
  Titulo: string;
  Contenido: string;
  Portada: {
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

// Esta función corre en el servidor al renderizar
async function getMensajes(): Promise<Mensaje[]> {
  const res = await fetch("http://localhost:3000/api/mensaje", {
    cache: "no-store", // para evitar cache si Strapi cambia
  });

  if (!res.ok) throw new Error("Error al cargar mensajes");

  const data = await res.json();

  // Validación opcional
  if (!Array.isArray(data)) {
    throw new Error("La respuesta no es una lista");
  }

  return data;
}

export default async function MensajesPage() {
  const mensajes = await getMensajes();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Articulo desde Route:</h1>
      <ul>
        {mensajes.map((msg) => (
          <li key={msg.id} className="mb-6">
            <strong className="text-xl">{msg.Titulo}</strong>
            <br />
            <img
              src={`http://localhost:1337${msg.Portada.formats.medium.url}`}
              alt={msg.Titulo}
              className="rounded-md w-full mb-2"
            />
            <p>{msg.Contenido}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
