// app/posts/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function PostPage() {
  const params = useParams();
  const slug = params?.slug; // Se hace una comprobación de null/undefined

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificamos que slug no sea null ni undefined antes de proceder
    if (!slug) {
      setError("Slug no disponible.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/articles?slug=${slug}`);
        if (response.data.length > 0) {
          setArticle(response.data[0]);
        } else {
          setError("Artículo no encontrado.");
        }
      } catch (err) {
        setError("Error al obtener el artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="p-8">Cargando artículo...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!article) return <div className="p-8">Artículo no disponible.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{article.Titulo}</h1>
      {article.Portada?.formats?.medium?.url && (
        <img
          src={`http://localhost:1337${article.Portada.formats.medium.url}`}
          alt={article.Titulo}
          className="mb-4 w-full rounded-lg"
        />
      )}
      <p className="mt-2 whitespace-pre-line">{article.Contenido}</p>
    </div>
  );
}
