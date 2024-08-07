import express, { Request, Response } from "express";
import getTweetsService from "../services/tweetsService";

const tweetsRouter = express.Router();

tweetsRouter.get("/", getTweets);

async function getTweets(req: Request, res: Response) {
    try {
        const tweets = await getTweetsService();
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export default tweetsRouter;




