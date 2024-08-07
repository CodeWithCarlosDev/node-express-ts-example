import express, { Request, Response } from "express";
import tweetsRouter from "./routes/tweetsRouter";

const app = express();
const PORT = 3000;

app.use("/tweets", tweetsRouter);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






