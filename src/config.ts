const API_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL as string)
  : "localhost";

export { API_URL };
