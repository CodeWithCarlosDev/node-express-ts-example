import { Pool, RowDataPacket } from "mysql2/promise";
import SqlStatements from "./const/sql-statements";
import MySQLConnection from "./database";


interface User extends RowDataPacket {
    userId: number,
    username: string,
    email: string,
    passwordHash: string,
    bio: string,
    location: string
}

const printError = (msg: string) => (error: any) => {
    return { msg, error: (error as Error).message }
}

const initTables = async (connection: Pool): Promise<void> => {
    try {
        await connection.query(SqlStatements.CREATE_USER_TABLE);
        console.log('Tabla "users" creada con éxito');
        await connection.query(SqlStatements.CREATE_TWEETS_TABLE);
        console.log('Tabla "tweets" creada con éxito');
    } catch (error) {
        printError("Error al crear las tablas")(error);
    }
}

const insertTableUsers = async (connection: Pool): Promise<void> => {
    try {
        await connection.query(SqlStatements.INSERT_USERS);
        console.log('Datos insertados en la tabla "users" con éxito');
    } catch (error) {
        printError("Error insertar datos en la tabla 'users'")(error);
    }
}

const runMigration = async (): Promise<void | string> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;
    try {
        await initTables(connection);
        await insertTableUsers(connection);
    } finally {
        await connection.end();
    }
}

const getUsersData = async (): Promise<User[] | { msg: string; error: any; } | void> => {
    const baseDate = new MySQLConnection();
    const connection: Pool = baseDate.connection;
    try {
        const [users] = await connection.query<User[]>(SqlStatements.QUERY_USERS);
        users.forEach(user => {
            console.log("userId", user.userId);
            console.log("username", user.username);
            console.log("email", user.email);
            console.log("passwordHash", user.passwordHash);
            console.log("userId", user.bio);
            console.log("userId", user.location);
        });
          return users;
    } catch (error) {
        return printError("Error al obtener los datos de la tabla 'users' ")(error);
    } finally {
        await connection.end();
    }
}

export { getUsersData }
export default runMigration;




/*

const baseDate = new MySQLConnection ();
const connection: Pool = baseDate.connection;

(async () => {
    try {
        await connection.query(createUsersTable);
        console.log('Tabla "users" creada con exito');

        await connection.query(createUsersTable);
        console.log('Tabla "users" creada con exito');

        await connection.query(insertUsers);
        console.log('Tabla "users" creada con exito');
    } catch (error) {
        printError("Error en la consulta SQL ")(error)
    }
})();

*/





