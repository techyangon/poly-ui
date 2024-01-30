const API_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL as string)
  : "http://localhost";

const AUTH_CHECK = {
  EMAIL: {
    EMPTY: "Email cannot be empty.",
    INVALID: "Invalid email.",
  },
  PASSWORD: {
    LENGTH: "Password must be at least 8 characters.",
  },
};

const AUTH_RESPONSE = {
  ERROR: "Incorrect email or password.",
  SERVER: "Server unavailable.",
};

const PASSWORD_CHECK = {
  DIGIT: "Must contain at least one digit.",
  LENGTH: "Must be at least 8 characters in length.",
  LOWER: "Must contain at least one lowercase.",
  MATCH: "Passwords don't match.",
  SPECIAL: "Must contain at least one special character.",
  UPPER: "Must contain at least one uppercase.",
};

const PROFILE_RESPONSE = {
  ERROR: "Current password is incorrect.",
};

export { API_URL, AUTH_CHECK, AUTH_RESPONSE, PASSWORD_CHECK, PROFILE_RESPONSE };
