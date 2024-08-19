import express, { Request, Response } from "express";
import config from "./config";
import tweetsRouter from "./routes/tweetsRouter";
import { logError, wrapErrors, errorHandler } from "./utils/middlewares/errorMiddleware";
import notFoundMiddleware from "./utils/middlewares/notFoundMiddleware";

const app = express();
const PORT = config.port;

app.use(express.json());
app.use("/tweets", tweetsRouter);

// 404 middlewares
app.use(notFoundMiddleware);

// error middlewares
app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






