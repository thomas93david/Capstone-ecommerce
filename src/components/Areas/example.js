
async function pagination(increment, pageSize){
    try {
        const {rows: movies} = await client.query(`
        SELECT * 
        FROM movies   
        ORDER BY  id
        OFFSET $1 
        LIMIT $2;
        `, [increment * pageSize, pageSize]);

        return movies;
    } catch (error) {
        console.error(error);
    }
}

let increment = 10;
