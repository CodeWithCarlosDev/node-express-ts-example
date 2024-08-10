import dotenv from "dotenv"

dotenv.config();

const config = {
    dev: process.env.NODE_ENV === "development",
    host: process.env.HOST,
    port: process.env.PORT || 3000,
    portbd: process.env.PORT_BD || 3000,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

export default config;