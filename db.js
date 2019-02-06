const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

/* todo útfæra */

const client = new Client({
  connectionString,
});

client.connect();
async function insert(name) {
    try {
      const query = 'INSERT INTO applications (name, email, phonenumber, text, job, processed, created, updated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
      const res = await client.query(query, values);
      console.log(res.rows);
    } catch (e) {
      console.error('Error selecting', e);
    } finally {
      await client.end(); // alltaf keyrt
    }
}
 // insert().catch(e => console.error(e));
  console.log("tenging næst við ganggrunn!");
  client.end();

module.exports = {
  insert,
};
