# memstate-api 🚀

[![npm version](https://badge.fury.io/js/memstate-api.svg)](https://badge.fury.io/js/memstate-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Un servidor de API mock **stateful** (con estado) para Node.js. Corre con `npx` y no olvida tus cambios de `POST` o `DELETE`.

Creado para desarrolladores frontend que están cansados de que `json-server` sea _stateless_ (sin estado) y de que `MirageJS` se ejecute en el _navegador_.

## El Problema

Las herramientas de mocking tradicionales te obligan a elegir:

| Herramienta       | Lo Bueno                                | Lo Malo                                                                                     |
| :---------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------ |
| **`json-server`** | Es un servidor Node.js real.            | **Es Stateless.** Un `POST` no se guarda. Inútil para flujos de UI complejos.               |
| **`MirageJS`**    | **Es Stateful.** Los cambios persisten. | **No es un servidor real.** Se ejecuta en el navegador, no aparece en la pestaña "Network". |

## La Solución: `memstate-api`

`memstate-api` te da lo mejor de ambos mundos:

- ✅ **Stateful por Defecto:** Al igual que MirageJS, mantiene una base de datos en memoria. Un `POST` añade datos, un `DELETE` los borra.
- ✅ **Un Servidor Node.js Real:** Al igual que `json-server`, se ejecuta en Node.js, responde a `localhost` y puedes ver cada petición en la pestaña "Network" de tu navegador.

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
