import express, { Request, Response } from "express";
import config from "./config";
import tweetsRouter from "./routes/tweetsRouter";

const app = express();
const PORT = config.port;

app.use(express.json());
app.use("/tweets", tweetsRouter);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






