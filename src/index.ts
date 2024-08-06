import express, { Request, Response } from "express";
import runMigration, { getUsersData } from "./scripts/seedTables";
import insertTableTweets, { getTweetsData } from "./scripts/seedTweets";

const app = express();
const PORT = 3000;

app.get("/users", async (req: Request, res: Response) => {
    try {
        await runMigration();
        const data = await getUsersData();
        res.json(data);
    } catch (error) {
        res.send((error as Error).message)
    }
})

app.get("/tweets", async (req: Request, res: Response) => {
    try {
        await insertTableTweets();
        const data = await getTweetsData();
        res.json(data);
    } catch (error) {
        res.send((error as Error).message)
    }
})

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 😎😎👍:" + PORT)
})






