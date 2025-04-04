'use client';

import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  documentId: string;
  StephenCurry: string;
  Descripcion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/blog")
      .then((response) => {
        if (response.data && response.data.data) {
          setArticles(response.data.data);
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
              <h3>{article.StephenCurry}</h3>
              <p>{article.Descripcion}</p>
              <small>Publicado: {new Date(article.publishedAt).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No hay artículos disponibles.</p>
        )}
      </div>
    </div>
  );
}
