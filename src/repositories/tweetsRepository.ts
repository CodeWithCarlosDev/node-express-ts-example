import { Pool, RowDataPacket } from "mysql2/promise"
import MySQLConnection from "../database";
import SqlStatements from "../const/sql-statements";


interface Tweet extends RowDataPacket {
    tweetId: number,
    userID: number,
    content: string
}

const getTweets = async (): Promise<Tweet[]> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        const [tweets] = await connection.query<Tweet[]>(SqlStatements.QUERY_TWEETS);
        return tweets;
    } catch (error) {
        throw new Error((error as Error).message)
    } finally {
        await connection.end();
    }
}

const getTweetsById = async (tweetId: string) => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        const query = "SELECT * FROM tweets WHERE  tweetId = ? ";
        const [tweets] = await connection.query<Tweet[]>(query, tweetId);
        return tweets;
    } catch (error) {
        throw new Error((error as Error).message)
    } finally {
        await connection.end();
    }
}

const createTweet = async (tweet: Tweet): Promise<{}> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        const query = "INSERT INTO tweets SET ?";
        const [tweetRes] = await connection.query<Tweet[]>(query, tweet);
        return {
            tweetRes,
            tweet
        };
    } catch (error) {
        throw new Error((error as Error).message)
    } finally {
        await connection.end();
    }
}

const deleteTweet = async (tweetId: string) => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        const query = "DELETE  FROM tweets WHERE  tweetId = ? ";
        const [resulset] = await connection.query<Tweet[]>(query, tweetId);
        return resulset;
    } catch (error) {
        throw new Error((error as Error).message)
    } finally {
        await connection.end();
    }
}

const updateTweet = async (tweetId: string, tweet: Tweet): Promise<{}> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        const query = "UPDATE tweets SET  content = ?  WHERE  tweetId = ? ";
        const values = [tweet.content, tweetId]
        const [resulset] = await connection.query<Tweet[]>(query, values);
        return resulset;
    } catch (error) {
        throw new Error((error as Error).message)
    } finally {
        await connection.end();
    }
}

export {
    Tweet,
    createTweet,
    getTweets,
    getTweetsById,
    deleteTweet,
    updateTweet
}


