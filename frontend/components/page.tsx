"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  Titulo: string;
  Contenido: string;
  Portada?: {
    formats: {
      medium?: { url: string };
    };
  };
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:1337/articles?slug=jordan");
        setArticles(response.data);
      } catch (error) {
        setError("Error al obtener los artículos.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-10">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded-xl shadow-md">
            {article.Portada?.formats?.medium?.url && (
              <img
                src={`http://localhost:1337${article.Portada.formats.medium.url}`}
                alt={article.Titulo}
                className="mb-4 w-full rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold">{article.Titulo}</h2>
            <p className="mt-2 whitespace-pre-line">{article.Contenido}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
