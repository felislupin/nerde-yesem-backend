const Client = require('pg').Client;
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

module.exports = {
  queryPromise: async (text, params) => {
    let res = await client.query(text, params);
    if (res) {
      return res.rows;
    } else {
      throw "Error occurred while requesting to db!"
    }
  }
};