'use client';

import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  documentId: string;
  StephenCurry: string;
  Descripcion: string;
  createdAt: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificamos si axios está funcionando correctamente
    axios
      .get("http://localhost:1337/api/articles") // Asegúrate de que esta URL es la correcta
      .then((response) => {
        console.log(response); // Agregamos un log para ver qué retorna la API
        if (response.data && Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          setError("Error: Datos recibidos no son válidos.");
        }
      })
      .catch((err) => {
        console.error(err); // Log del error para depuración
        setError("Hubo un error al cargar los artículos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Artículos de Blog</h2>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} style={{ marginBottom: "20px" }}>
            <h3>{article.StephenCurry}</h3>
            <p><strong>ID:</strong> {article.documentId}</p>
            <p>{article.Descripcion}</p>
            <small>Publicado el: {new Date(article.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </div>
  );
}
