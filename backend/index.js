const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

exports.handler = async (event) => {
  const connection = mysql.createConnection(dbConfig);
  
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Database connection failed' }),
        });
      } else {
        connection.query('SELECT NOW()', (error, results) => {
          if (error) {
            reject({
              statusCode: 500,
              body: JSON.stringify({ error: 'Query failed' }),
            });
          } else {
            resolve({
              statusCode: 200,
              body: JSON.stringify({ time: results[0]['NOW()'] }),
            });
          }
          connection.end();
        });
      }
    });
  });
};
