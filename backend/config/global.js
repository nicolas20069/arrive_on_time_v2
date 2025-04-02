import dotenv from "dotenv";

dotenv.config();

export const {
    DB_HOST = "localhost",
    DB_USER = "root",
    DB_PASSWORD = "",
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