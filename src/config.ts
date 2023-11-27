const API_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL as string)
  : "localhost";

const AUTH_CHECK = {
  EMAIL: {
    EMPTY: "Email cannot be empty",
    INVALID: "Invalid email",
  },
  PASSWORD: {
    LENGTH: "Password must be at least 8 characters",
  },
};

const AUTH_RESPONSE = {
  ERROR: "Incorrect email or password",
};

export { API_URL, AUTH_CHECK, AUTH_RESPONSE };
