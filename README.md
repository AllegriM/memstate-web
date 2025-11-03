# memstate-api 🚀

[![npm version](https://badge.fury.io/js/memstate-api.svg)](https://badge.fury.io/js/memstate-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Un servidor de API mock **stateful** (con estado) para Node.js. Corre con `npx` y no olvida tus cambios de `POST` o `DELETE`.

Creado para desarrolladores frontend que están cansados de que `json-server` sea _stateless_ (sin estado) y de que `MirageJS` se ejecute _dentro del navegador_.

## El Problema

Las herramientas de mocking tradicionales te obligan a elegir:

- **`json-server`**: Es un servidor Node.js real, pero es **Stateless** (sin estado). Un `POST` no se guarda.
- **`MirageJS`**: Es **Stateful** (con estado), pero **no es un servidor real**. Se ejecuta en el navegador.

## La Solución: `memstate-api`

`memstate-api` te da lo mejor de ambos mundos:

- ✅ **Stateful por Defecto:** Mantiene una base de datos en memoria. Un `POST` añade datos, un `DELETE` los borra.
- ✅ **Un Servidor Node.js Real:** Se ejecuta en Node.js, responde a `localhost` y puedes ver cada petición en la pestaña "Network" de tu navegador.

---

## Características Principales

- ⚡️ **Estado Persistente en Memoria:** Los cambios de `POST`, `PUT`, `PATCH` y `DELETE` se guardan _realmente_ mientras el servidor esté corriendo.
- 🚀 **Cero-Config con `db.json`:** Solo crea un `db.json` y corre `npx memstate-api` para tener un CRUD stateful al instante.
- 🔧 **Configuración Avanzada Opcional:** Añade un `memstate-config.js` para crear rutas personalizadas, simular retrasos (`delay`) y usar `faker` para poblar tu API.
- 🔎 **Visor de Base de Datos:** Revisa el estado actual de tu base de datos en memoria en cualquier momento visitando `http://localhost:3000/_memstate/db`.
- 📦 **`faker-js` Incluido:** Genera datos falsos realistas directamente desde tu archivo de configuración.

---

## Modo 1: Cero-Config (`npx` + `db.json`)

Esta es la forma más rápida de empezar.

### 1. Crea `db.json`

En la raíz de tu proyecto, crea un archivo `db.json` con tus datos iniciales.

**`db.json`**

```json
{
  "posts": [
    { "id": 1, "title": "Mi primer post" },
    { "id": 2, "title": "Mi segundo post" }
  ],
  "users": [{ "id": 1, "name": "Ana" }]
}
```

````

### 2\. Ejecuta NPX

¡Eso es todo\! No necesitas instalar nada. Solo corre este comando en tu terminal:

```bash
npx memstate-api
```

### 3\. ¡Listo\!

`memstate-api` detectará tu `db.json` y creará automáticamente 5 rutas CRUD _stateful_ para cada recurso (`/posts` y `/users`):

```bash
Base de datos cargada desde db.json.
No se encontró memstate-config.js. Creando rutas automáticamente desde db.json...
 -> Creando 5 rutas CRUD para /posts
 -> Creando 5 rutas CRUD para /users
🚀 memstate-api corriendo en http://localhost:3000
```

Ahora puedes hacer `POST` a `/posts` y el nuevo post aparecerá en la siguiente llamada `GET /posts`.

---

````

---

### PARTE 2

(Ahora, haz clic en el botón 'Copiar' ❐ de **este** bloque y pégalo **justo debajo** de la Parte 1)

````markdown
## Modo 2: Avanzado (`npx` + `config.js`)

Si necesitas rutas personalizadas (ej. `/auth/login`), simular retrasos o usar `faker`, puedes usar el modo avanzado.

### 1. Instala el Paquete (Opcional, para tipos)

Para obtener autocompletado y acceso a `faker`, instala el paquete:

```bash
npm install --save-dev memstate-api
```
````

### 2\. Crea `memstate-config.js`

`memstate-api` detectará este archivo y le dará prioridad sobre `db.json`.
(Recuerda usar sintaxis CommonJS: `require` y `module.exports`).

**`memstate-config.js`**

```javascript
const { faker } = require("memstate-api");

/** @type {import('memstate-api').ServerContext} */
const config = {
  routes(server) {
    // 1. Simular una red lenta (1 segundo de retraso en todas las rutas)
    server.delay(1000);

    // 2. Poblar una ruta con data falsa
    server.resource(
      "/users",
      faker.helpers.multiple(createFakeUser, { count: 10 })
    );

    // 3. Crear una ruta custom (stateless)
    server.post("/auth/login", (db, req) => {
      // 'db' sigue disponible (ej. db.users)
      const { email, password } = req.body;
      if (email === "admin@test.com") {
        return { token: "fake-jwt-token-123" };
      }
      // Usa el ayudante de error
      return server.error(401, { error: "Credenciales inválidas" });
    });
  },
};

const createFakeUser = () => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
});

module.exports = config;
```

### 3\. Ejecuta NPX

El mismo comando de antes:

```bash
npx memstate-api
```

Esta vez, cargará tu configuración personalizada:

```bash
Cargando configuración desde memstate-config.js...
Estableciendo delay global a 1000ms
Rutas personalizadas (estilo Argumento) cargadas.
🚀 memstate-api corriendo en http://localhost:3000
```

---

## API del `serverContext`

Cuando usas `memstate-config.js`, tu función `routes(server)` recibe un objeto `server` con estas herramientas:

### `server.resource(ruta, data?)`

Crea 5 rutas CRUD (`GET`, `GET /:id`, `POST`, `PUT`, `PATCH`, `DELETE`) para una `ruta`.

- `ruta` (string): La ruta base (ej. `'/posts'`).
- `data` (array, opcional): Un array de datos iniciales para poblar la ruta.

### `server.get(ruta, handler)`

(También `.post`, `.put`, `.patch`, `.delete`)

Crea una ruta personalizada. El `handler` es una función `(db, req)`:

- `db`: El objeto de la base de datos en memoria.
- `req`: El objeto `Request` de Express (accede a `req.body`, `req.params`, etc.).

### `server.delay(ms)`

Añade un retraso global (en milisegundos) a _todas_ las respuestas de la API.

### `server.error(codigo, body)`

Un ayudante para devolver respuestas de error JSON desde tus handlers (ej. `return server.error(404, { error: 'No encontrado' })`).

---

## Licencia

MIT

```

```
