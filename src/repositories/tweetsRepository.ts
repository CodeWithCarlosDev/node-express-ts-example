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


export { Tweet }
export default getTweets;

