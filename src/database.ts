import dotenv from "dotenv";
import { createPool, Pool, PoolOptions } from "mysql2/promise";


dotenv.config();

if (
    !process.env.HOST ||
    !process.env.PORT ||
    !process.env.USER ||
    !process.env.PASSWORD ||
    !process.env.DATABASE
) {
    throw new Error("Faltan variables de entornos requeridas..")
}

const credentials: PoolOptions = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

export default class MySQLConnection {

    private _conn: Pool;
    private readonly _ERROR_CONNECT: string = "Error al conectar con la base de datos.. 🤦‍♂️🤷‍♂️🐱‍🏍";

    constructor() {
        this._conn = createPool(credentials)
        this.assertValidation();
    }

    private async assertValidation(): Promise<void | never> {
        try {
            const connection = await this._conn.getConnection();
            connection.release();
        } catch (error) {
            throw new Error(this._ERROR_CONNECT + (error as Error).message)
        }
    }

    public get connection(): Pool {
        return this._conn;
    }


}