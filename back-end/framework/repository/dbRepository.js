import { BookReview } from "./back-end/entity/bookReview.js";
import { RepositoryError } from "./back-end/utility/error.js";
import { handleQueryResponse, handleRepoReponse } from "./back-end/utility/response.js";
import postgreSQL from 'pg';
import 'dotenv/config';

const dbCnnection = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT

};

export const dbRepository = {
    COLUMN_NAMES_STR: 'title,author,isbn,genre,rating,read_date,summary,review,note',
    create: async (bookReview) => handleRepoReponse(async () => {
        if(bookReview instanceof BookReview) {
            const dbQueryResult = await dbRepository.query(
                'INSERT INTO bookreview VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
                bookReview.valuesArr() // an array of values that fills in the db query values
            );
            return dbQueryResult;
        } else {
            throw new RepositoryError({
                message: 'Invalid bookReview instance as argument of dbRepository.create().'
            });
        }
    }),
    get: async (id) => handleRepoReponse(async () => {
        const dbQueryResult = await dbRepository.query('SELECT * FROM bookreview WHERE id = $1', [id]);
        return dbQueryResult;
    }),
    getAll: async () => handleRepoReponse(async () => {
        const dbQueryResult = await dbRepository.query('SELECT * FROM bookreview');
        return dbQueryResult;
    }),
    update: async (id, newData) => handleRepoReponse(async () => {
        if(newData instanceof Object) {
            if(Object.keys(newData).every(key => dbRepository.COLUMN_NAMES_STR.includes(key))) {
                const bookReview = (await dbRepository.get(id)).data;
                const editedBookReview = bookReview.edit(newData);
                const setSTR = [];
                for(const idx in newData) {
                    if(typeof editedBookReview[idx] === 'string')
                        setSTR.push(`${idx} = '${editedBookReview.get(idx)}'`)
                    else setSTR.push(`${idx} = ${editedBookReview.get(idx)}`) 
                };
                const statement = `UPDATE bookreview SET ${setSTR.join(', ')} WHERE id = $1 RETURNING *`
                const dbQueryResult = await dbRepository.query(statement,
                    [id]
                );
                return dbQueryResult;
            }
        }
    }),
    delete: async (id) => handleRepoReponse(async () => {
        const dbQueryResult = await dbRepository.query('DELETE FROM bookreview WHERE id = $1 RETURNING *', [id])
        return dbQueryResult;
    }),
    random: async (amount) => handleRepoReponse(async () => {
        const dbQueryResult = await query(`SELECT * FROM bookreview ORDER BY RANDOM() LIMIT $1;`, [amount]);
        return dbQueryResult;
    }),
    filter: async (params) => {
        switch(params) {

        }
    },
    find: async (params) => {
        switch(params) {

        }
    },
    sort: async (params) => {
        switch(params) {

        }
    },
    query: async (statement, valuesArr = []) => handleQueryResponse(async () => {
        const client = new postgreSQL.Client(dbCnnection);
        await client.connect();
        const result = await client.query(statement, valuesArr);

        let resultData;
        if(result.rows.length > 1) resultData = result.rows; 
        else if(result.rows.length === 1) resultData = result.rows[0];
    
        client.end();

        return resultData;
    }, statement, valuesArr)
}