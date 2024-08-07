import { Tweet, createTweet, getTweets, getTweetsById, deleteTweet, updateTweet } from "../repositories/tweetsRepository";


const getTweetsService = async (): Promise<Tweet[]> => {
    return await getTweets();
}

const createTweetsService = async (tweet: Tweet): Promise<{}> => {
    return await createTweet(tweet);
}

const getTweetsByIdService = async (tweetId: string): Promise<{}> => {
    return await getTweetsById(tweetId);
}


const deleteTweetService = async (tweetId: string): Promise<any> => {
    return await deleteTweet(tweetId);
}

const updateTweetService = async (tweetId: string, tweet: Tweet): Promise<any> => {
    return await updateTweet(tweetId, tweet);
}


export {
    getTweetsService,
    createTweetsService,
    getTweetsByIdService,
    deleteTweetService,
    updateTweetService
}
