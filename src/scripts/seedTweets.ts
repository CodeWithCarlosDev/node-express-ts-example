import { Pool, RowDataPacket } from "mysql2/promise";
import MySQLConnection from "../database";
import SqlStatements from "../const/sql-statements";


interface Tweet extends RowDataPacket {
    tweetId: number,
    userID: string,
    content: string
}

const logError = (message: string, error: any) => {
    console.error(`${message}`, (error as Error).message);
}

const insertTableTweets = async () => {

    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;

    try {
        await connection.query(SqlStatements.INSERT_TWEETS);
        console.log('Datos insertados en la tabla "tweets" con éxito');
    } catch (error) {
        logError("Error insertar datos en la tabla 'tweets'", error);
        throw new Error("No se pudieron insertar los datos de los tweets.");
    }
}

const getTweetsData = async (): Promise<Tweet[] | { msg: string; error: any; } | void> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;
    try {
        const [tweet] = await connection.query<Tweet[]>(SqlStatements.QUERY_TWEETS);
        tweet.forEach(tweet => {
            console.log("userId", tweet.tweetId);
            console.log("content", tweet.content);
        });
        return tweet;
    } catch (error) {
        logError("Error al obtener los datos de la tabla 'tweets'", error);
        return { msg: "Error al obtener los datos de la tabla 'tweets'", error: (error as Error).message };
    } finally {
        await connection.end();
    }
}

export { getTweetsData }
export default insertTableTweets;


