import { Connection, createConnection } from 'mysql'
import { logger } from '../../utils/logger';

interface DataBaseConfig {
    host: string,
    port: number,
    database: string
    user: string,
    password: string,
}


class DataBase {
    private dataBase: Connection;
    private constructor(dbConfig: DataBaseConfig) {
        this.dataBase = createConnection(dbConfig)
    }
    public static async create(dbConfig: DataBaseConfig) {
        let db = new DataBase(dbConfig)
        await db.conect();
        return db; 
    }
    
    private async conect() {
        this.dataBase.connect((error) => {
            if (error) {
                logger.error(error.message);
                throw new Error(error.stack);
            }
            logger.info(`dbhost: ${process.env.DBHOST}`)
            logger.info(`dbname: ${process.env.DBNAME}`)
            logger.info(`dbuser: ${process.env.DBUSER}`)
            logger.info(`dbport: ${process.env.DBPORT}`)
            return
        })
    }
    public getStream(query: string) {
        return this.dataBase.query(query).stream();
    }
    public async query<T>(query: string) {
        return new Promise<T[]>((resolve,reject)=>{
            this.dataBase.query(query, (error, results) => {
                if (error) {
                    logger.error(error.message)
                    this.destroyConnetion();
                    reject(new Error(error.stack))
                }
                resolve(results as T[])
            })
        })
    }
    private async destroyConnetion(){
        this.dataBase.destroy();
    }


}