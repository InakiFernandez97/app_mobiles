import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Prueba',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      // Configuración opcional
    },
  },
};

export default config;
