import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// ¡Importamos los componentes de Tabs!
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIDemo } from "@/components/APIDemo";

// Componente para los bloques de código (sin cambios)
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-auto text-sm">
      {code.trim()}
    </pre>
  );
}

// --- DATOS PARA AMBOS MÉTODOS ---

const npxSteps = [
  {
    title: "1. Crea tu base de datos",
    description: "Crea un archivo db.json en la raíz de tu proyecto.",
    code: `
{
  "posts": [
    { "id": 1, "title": "Mi primer post" }
  ],
  "users": [
    { "id": 1, "name": "Ana" }
  ]
}
`,
  },
  {
    title: "2. Ejecuta NPX",
    description: "¡Eso es todo! No necesitas instalar nada.",
    code: `npx memstate-api`,
  },
  {
    title: "(Resultado)",
    description: "Tu API stateful está corriendo en localhost:3000.",
    code: `
Base de datos cargada desde db.json.
Creando rutas automáticamente desde db.json...
 -> Creando 5 rutas CRUD para /posts
 -> Creando 5 rutas CRUD para /users
🚀 memstate-api corriendo en http://localhost:3000
`,
  },
];

// Método 2: "Modo Avanzado" (NPM + Config)
const npmSteps = [
  {
    title: "1. Instalación",
    description: "Instala los paquetes para usar `faker` y `ts-node`.",
    code: `npm install --save-dev memstate-api ts-node`,
  },
  {
    title: "2. Configuración (memstate-config.mjs)",
    description: "Crea un archivo de config para control total.",
    code: `
// memstate-config.mjs
const { faker } = require('memstate-api');

/** @type {import('memstate-api').ServerContext} */
const config = {
  routes(server) {
    // 1. Simula delay
    server.delay(500); 

    // 2. Pobla con faker
    server.resource('/posts', faker.helpers.multiple(createFakePost, { count: 5 }));
    
    // 3. Ruta custom
    server.post('/auth/login', (db, req) => {
      return { token: 'fake-jwt-token-123' };
    });
  }
};
module.exports = config;
`,
  },
  {
    title: "3. Ejecución (package.json)",
    description: "Añade el script y córrelo.",
    code: `
"scripts": {
  "mock:api": "npx memstate-api"
}
`,
  },
];

// --- La Página Principal ---
export default function Home() {
  return (
    <div className="space-y-8">
      {/* 1. Hero Section (Sin cambios) */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          memstate-api
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Un servidor de API mock <strong>stateful</strong> que no olvida tus
          cambios.
        </p>
      </section>

      {/* 2. Layout de Guía y Demo (Sin cambios) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna Izquierda: AHORA CON TABS */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Cómo Empezar</h2>

          <Tabs defaultValue="npx" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="npx">Modo Simple (NPX)</TabsTrigger>
              <TabsTrigger value="npm">Modo Avanzado (NPM)</TabsTrigger>
            </TabsList>

            {/* Contenido Pestaña 1: NPX */}
            <TabsContent value="npx" className="space-y-4 pt-4">
              {npxSteps.map((step) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={step.code} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Contenido Pestaña 2: NPM */}
            <TabsContent value="npm" className="space-y-4 pt-4">
              {npmSteps.map((step) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={step.code} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna Derecha: Demo Interactiva (Sin cambios) */}
        <div className="sticky top-8 h-fit">
          <APIDemo />
        </div>
      </div>
    </div>
  );
}
