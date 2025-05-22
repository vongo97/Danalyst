// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Asegúrate de que no haya configuraciones que deshabiliten o modifiquen el manejo de CSS */
  // Por ejemplo, evita cosas como:
  // experimental: {
  //   disablePostcssPresetEnv: true,
  // },
  // webpack(config, { isServer }) { ... } // A menos que sepas que es necesario para CSS
};

export default nextConfig;
