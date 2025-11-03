import { faker } from "memstate-api";

const createFakeUser = () => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
});

export default {
  // 'server' es tu "kit de herramientas"
  routes(server) {
    // Simular una API lenta (todas las rutas tardarán 1 segundo)
    server.delay(1000);

    // --- Ruta 1: Poblar '/posts' manualmente ---
    // (Ya no se usa db.json para esta ruta)
    server.resource("/posts", [{ id: 1, title: "Datos desde la config" }]);

    // --- Ruta 2: Poblar '/users' con data falsa ---
    server.resource(
      "/users",
      faker.helpers.multiple(createFakeUser, { count: 20 })
    );

    // --- Ruta 3: Lógica Custom (Stateless) ---
    server.post("/auth/login", (db, req) => {
      // 'db' sigue disponible si la necesitas (ej. db.users)
      const { email, password } = req.body;
      if (email === "admin@test.com") {
        return { token: "fake-jwt-token-123" };
      }
      // Usa el ayudante de error
      return server.error(401, { error: "Credenciales inválidas" });
    });
  },
};
