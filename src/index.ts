import express, { Request, Response } from "express";
import runMigration, { getUsersData } from "./database-operations";

const app = express();
const PORT = 3000;

app.get("/home", async (req: Request, res: Response) => {
    try {
        await runMigration();
        const data = await getUsersData();
        res.json(data);
    } catch (error) {
        res.send((error as Error).message)
    }
})

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






