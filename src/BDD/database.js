const mysql = require('mysql');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mdb'
});

// Define a function for executing SQL queries
function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      // Execute the query with the provided values (if any)
      connection.query(query, values, (err, results) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          reject(err);
          return;
        }

        resolve(results);
      });
    });
  });
}

// Create the texts table in the database and insert sample data
async function createTextsTable() {
  try {
    // SQL query for creating the texts table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Texts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        comment TEXT,
        page TEXT
      )
    `;

    // Execute the query to create the table
    await executeQuery(createTableQuery);
    console.log('Texts table created');

    // Check if HomeData already exists in the Texts table
    const checkExistingDataQuery = `SELECT COUNT(*) AS count FROM Texts WHERE page = 'Home'`;
    const existingData = await executeQuery(checkExistingDataQuery);

    if (existingData[0].count > 0) {
      console.log('HomeData already exists in the Texts table. Skipping insertion.');
      return;
    }

    // Insert sample data into the table
    const HomeData = [
      { content: 'Welcome to my digital abode', comment: 'ttlWelcome', page: 'Home' },
      { content: 'Embark on an extraordinary virtual odyssey through the realm of computer science. Join me as we navigate this exhilarating journey together, unlocking boundless opportunities along the way.', comment: 'lblHook', page: 'Home' },
      { content: 'Through this website, I invite you to explore my world, where I\'ll be sharing valuable insights, experiences, and projects. Whether you\'re an enthusiast, a curious mind, or simply seeking inspiration, join me as we delve into the exhilarating world of computer science. Together, let\'s unlock the door to innovation, embrace the limitless possibilities it offers, and explore the vast horizons of the digital landscape.', comment: 'paraWelcome', page: 'Home' }
    ];

    const insertQuery = 'INSERT INTO Texts (content, comment, page) VALUES ?';
    const values = HomeData.map(({ content, comment, page }) => [content, comment, page]);

    // Execute the query to insert the sample data
    await executeQuery(insertQuery, [values]);
    console.log('HomeData inserted into the Texts table');
  } catch (error) {
    console.error('Error creating texts table:', error);
  }
}

module.exports = {
  createTextsTable,
  executeQuery
};