// Variables de entorno
export const envs = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  PRODUCTION: import.meta.env.PROD ? 'true' : 'false',
} as const;
