'use client';

import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  Titulo: string;
  Contenido: string;
  Portada?: {
    url: string;
  };
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/articles") // Strapi 3.8 no usa `/api`
      .then((response) => {
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setError("Error: Datos recibidos no válidos.");
        }
      })
      .catch(() => {
        setError("Hubo un error al cargar los artículos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Artículos de Blog</h2>
      <div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} style={{ marginBottom: "20px" }}>
              <h3>{article.Titulo}</h3>
              {article.Portada?.url && (
                <img
                  src={`http://localhost:1337${article.Portada.url}`}
                  alt={article.Titulo}
                  style={{ width: "100%", maxWidth: "600px", height: "auto" }}
                />
              )}
              <p>{article.Contenido}</p>
            </div>
          ))
        ) : (
          <p>No hay artículos disponibles.</p>
        )}
      </div>
    </div>
  );
}
