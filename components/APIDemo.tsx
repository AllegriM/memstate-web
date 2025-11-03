"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = "http://localhost:4000/posts";

export function APIDemo() {
  const [output, setOutput] = useState(
    "// Haz clic en un botón para hacer un fetch..."
  );

  const runFetch = async (url: string, options: RequestInit = {}) => {
    setOutput("Cargando...");
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
      return data;
    } catch (err: any) {
      setOutput(
        `ERROR: No se pudo conectar.\n¿Está 'memstate-api' corriendo en localhost:3000?\n\n${err.message}`
      );
    }
  };

  const handleGet = () => {
    runFetch(API_URL);
  };

  const handlePost = () => {
    const newPost = {
      title: "¡Este post es nuevo!",
      body: "Fue creado desde la demo interactiva.",
    };
    runFetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
  };

  const handleDelete = async () => {
    const data = await runFetch(API_URL);
    if (data && data.length > 0) {
      const firstPostId = data[0].id;
      setOutput(`Borrando post con ID: ${firstPostId}...`);
      await runFetch(`${API_URL}/${firstPostId}`, {
        method: "DELETE",
      });
      setOutput(
        `Post ${firstPostId} borrado. Haz "GET /posts" de nuevo para verlo.`
      );
    } else if (data) {
      setOutput("No hay posts para borrar.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Demo Interactiva</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Asegúrate de tener tu servidor <code>memstate-api</code> corriendo en{" "}
          <code>localhost:3000</code>.
        </p>
        <div className="flex flex-wrap gap-2 border-b pb-4 mb-4">
          <Button onClick={handleGet}>GET /posts</Button>
          <Button onClick={handlePost} variant="secondary">
            POST /posts
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            DELETE /posts/:id (el primero)
          </Button>
        </div>
        <pre className="bg-muted text-muted-foreground p-4 rounded-md h-64 overflow-auto">
          {output}
        </pre>
      </CardContent>
    </Card>
  );
}
