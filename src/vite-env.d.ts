/// <reference types="vite/client" />

interface Window {
  _env_?: {
    VITE_APP_ENV?: string;
    VITE_API_URL?: string;
    VITE_WS_URL?: string;
  };
}
