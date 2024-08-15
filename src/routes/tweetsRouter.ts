import express, { Request, Response, NextFunction } from "express";
import validate from "../utils/middlewares/createValidationMiddlewares";
import {
    getTweetsService,
    createTweetsService,
    getTweetsByIdService,
    deleteTweetService,
    updateTweetService
} from "../services/tweetsService";
const tweetsShemas = require("../utils/schemas/tweetsShemas");

const tweetsRouter = express.Router();
tweetsRouter.get("/", getTweets);
tweetsRouter.get("/:tweetId", validate({ params: tweetsShemas.tweetIdShema }), getTweetsById);
tweetsRouter.post("/", validate({ body: tweetsShemas.createTweetShema }), createTweet);
tweetsRouter.delete("/:tweetId", validate({ params: tweetsShemas.tweetIdShema }), deleteTweet);
tweetsRouter.patch(
    "/:tweetId",
    validate({ params: tweetsShemas.tweetIdShema }),
    validate({ params: tweetsShemas.updateTweetsShema }),
    updateTweet
);

/*
const handleValidation = (res: Response, data: any, schema: AnySchema) => {
    console.log("handleValidation");
    console.log(res.status, "Response");
    const validateError = validate(data, schema);
    if (validateError) {
        return res.status(408)
            .json({ error: validateError.message });
    }
}
*/
async function getTweets(req: Request, res: Response, next: NextFunction) {
    try {
        //  throw new Error("Error al obtener los tweets")
        const tweets = await getTweetsService();
        res.status(200).json(tweets);
    } catch (error) {
        // res.status(500).json({ error: (error as Error).message })
        next(error)
    }
}

async function getTweetsById(req: Request, res: Response, next: NextFunction) {
    console.log("getTweetsById");
    try {
        const { tweetId } = req.params;
        // handleValidation(res, { tweetId }, tweetsShemas.tweetIdShema);
        const tweet = await getTweetsByIdService(parseInt(tweetId));
        res.status(200).json(tweet);
    } catch (error) {
        // res.status(500).json({ error: (error as Error).message })
        next(error);
    }
}

async function createTweet(req: Request, res: Response, next: NextFunction) {
    try {
        const tweet = req.body;
        //  handleValidation(res, tweet, tweetsShemas.createTweetShema);
        const tweets = await createTweetsService(tweet);
        res.status(200).json(tweets);
    } catch (error) {
        //  res.status(500).json({ error: (error as Error).message })
        next(error);
    }
}

async function deleteTweet(req: Request, res: Response, next: NextFunction) {
    try {
        const { tweetId } = req.params;
        //  handleValidation(res, { tweetId }, tweetsShemas.tweetIdShema);
        const resul = await deleteTweetService(parseInt(tweetId));
        if (resul?.affectedRows > 0) {
            res.status(200).json({ message: "Tweet eliminado .." });
        } else {
            res.status(404).json({ message: "Tweet no encontrado .." });
        }

    } catch (error) {
        //  res.status(500).json({ error: (error as Error).message })
        next(error);
    }
}

async function updateTweet(req: Request, res: Response, next: NextFunction) {
    try {
        const { tweetId } = req.params;
        const tweet = req.body;
        //  handleValidation(res, { tweetId }, tweetsShemas.tweetIdShema);
        //  handleValidation(res, tweet, tweetsShemas.updateTweetsShema);
        const resul = await updateTweetService(parseInt(tweetId), tweet);

        if (resul?.affectedRows > 0) {
            res.status(200).json({ message: "Tweet actualizado : ", tweet });
        } else {
            res.status(404).json({ message: "Tweet no encontrado .." });
        }
    } catch (error) {
        // res.status(500).json({ error: (error as Error).message })
        next(error);
    }
}

export default tweetsRouter;




