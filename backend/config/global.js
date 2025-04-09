import dotenv from "dotenv";

dotenv.config();

export const {
    DB_HOST = "192.168.1.7",
    DB_USER = "linux",
    DB_PASSWORD = "tonsquemami",
    DB_DATABASE = "arrive_on_time",
    PORT = 5000,
    NODE_ENV = 'development',
    FRONTEND_URL = "http://localhost:5173",
    SECRET_JWT_KEY,
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} = process.env