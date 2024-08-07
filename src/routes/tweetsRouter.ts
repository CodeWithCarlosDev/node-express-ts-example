import express, { Request, Response } from "express";
import {
    getTweetsService,
    createTweetsService,
    getTweetsByIdService,
    deleteTweetService,
    updateTweetService
} from "../services/tweetsService";

const tweetsRouter = express.Router();

tweetsRouter.get("/", getTweets);
tweetsRouter.post("/", createTweet);
tweetsRouter.delete("/:tweetId", deleteTweet);
tweetsRouter.patch("/:tweetId", updateTweet);

async function getTweets(req: Request, res: Response) {
    try {
        const tweets = await getTweetsService();
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

async function getTweetsById(req: Request, res: Response) {
    try {
        const { tweetId } = req.params;
        const tweet = await getTweetsByIdService(tweetId);
        res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

async function createTweet(req: Request, res: Response) {
    try {
        const tweet = req.body;
        const tweets = await createTweetsService(tweet);
        res.status(200).json(tweets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message })
    }
}

async function deleteTweet(req: Request, res: Response) {
    try {
        const { tweetId } = req.params;
        const resul = await deleteTweetService(tweetId);
        if (resul?.affectedRows > 0) {
            res.status(200).json({ message: "Tweet eliminado .." });
        } else {
            res.status(404).json({ message: "Tweet no encontrado .." });
        }

    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

async function updateTweet(req: Request, res: Response) {
    try {
        const { tweetId } = req.params;
        const tweet = req.body;
        const resul = await updateTweetService(tweetId, tweet);

        if (resul?.affectedRows > 0) {
            res.status(200).json({ message: "Tweet actualizado : ", tweet });
        } else {
            res.status(404).json({ message: "Tweet no encontrado .." });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export default tweetsRouter;




