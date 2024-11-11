import { BookReview } from "./back-end/entity/bookReview.js";
import { RepositoryError } from "./back-end/utility/error.js";
import { handleQueryResponse, handleRepoReponse } from "./back-end/utility/response.js";
import postgreSQL from 'pg';
import 'dotenv/config';
import { nanoid } from "nanoid";

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
                bookReview.valuesArr() // an array of values that fills in the 
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
    random: async (amount = 1) => handleRepoReponse(async () => {
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

const data = {
    title: 'Lock Every Door: A Novel',
    author: 'Riley Sager',
    isbn: '978-1432866679',
    genre: 'Thriller/Suspense',
    rating: 10,
    read_date: '08/01/2022',
    summary: `The next heart-pounding thriller from New York Times bestselling author Riley Sager follows a young woman whose new job apartment sitting in one of New York's oldest and most glamorous buildings may cost more than it pays.
No visitors. No nights spent away from the apartment. No disturbing the other residents, all of whom are rich or famous or both. These are the only rules for Jules Larsen's new job as an apartment sitter at the Bartholomew, one of Manhattan's most high-profile and mysterious buildings. Recently heartbroken and just plain broke, Jules is taken in by the splendor of her surroundings and accepts the terms, ready to leave her past life behind.

As she gets to know the residents and staff of the Bartholomew, Jules finds herself drawn to fellow apartment sitter Ingrid, who comfortingly reminds her of the sister she lost eight years ago. When Ingrid confides that the Bartholomew is not what it seems and the dark history hidden beneath its gleaming facade is starting to frighten her, Jules brushes it off as a harmless ghost story . . . until the next day, when Ingrid disappears.

Searching for the truth about Ingrid's disappearance, Jules digs deeper into the Bartholomew's sordid past and into the secrets kept within its walls. What she discovers pits Jules against the clock as she races to unmask a killer, expose the building's hidden past, and escape the Bartholomew before her temporary status becomes permanent.`,
    review: `This book kept me on my toes the entire time. I was really involved with all of the characters and it really got me engaged. I was really eager to see how everything turned out. I read this book until it was dont and then still wanted to read it more. I wanted to know what happened to the characters after the fact. I haven't been able to stop thinking about this book since I read it.`, 
}

async function testing() {
    const test = {
        summary: 'test'
    }
    try {
        console.log(await dbRepository.create(data));
    } catch (error) {
        console.error(error.message)
    }
}

testing()