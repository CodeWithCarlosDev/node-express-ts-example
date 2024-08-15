import express, { Request, Response } from "express";
import config from "./config";
import tweetsRouter from "./routes/tweetsRouter";
import { logError, wrapErrors, errorHandler } from "./utils/middlewares/errorMiddleware";

const app = express();
const PORT = config.port;

app.use(express.json());
app.use("/tweets", tweetsRouter);

// error middlewares
app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






