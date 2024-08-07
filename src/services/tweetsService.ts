import getTweets, { Tweet } from "../repositories/tweetsRepository";


const getTweetsService = async (): Promise<Tweet[]> => {
    return await getTweets();
}

export default getTweetsService;