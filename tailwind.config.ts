import type { Config } from "tailwindcss";

const config = {
  // ... (tu configuración de 'darkMode', 'content', 'theme', etc.)

  plugins: [
    require("tailwindcss-animate"), // <-- AÑADE ESTA LÍNEA
  ],
} satisfies Config;

export default config;
