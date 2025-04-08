// app/api/mensaje/route.ts

export async function GET() {
    const res = await fetch("http://localhost:1337/articles");
    const data = await res.json();
    return Response.json(data);
  }
  