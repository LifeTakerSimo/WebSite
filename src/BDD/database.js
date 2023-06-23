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
    const query = `
      CREATE TABLE IF NOT EXISTS Texts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        comment TEXT,
        page TEXT
      )
    `;

    // Execute the query to create the table
    await executeQuery(query);
    console.log('Texts table created');

    // Insert sample data into the table
    const sampleData = [
      { content: 'Sample Content 1', comment: 'Sample Comment 1', page: 'Sample Page 1' },
      { content: 'Sample Content 2', comment: 'Sample Comment 2', page: 'Sample Page 2' },
      { content: 'Sample Content 3', comment: 'Sample Comment 3', page: 'Sample Page 3' }
    ];

    const insertQuery = 'INSERT INTO Texts (content, comment, page) VALUES ?';
    const values = sampleData.map(({ content, comment, page }) => [content, comment, page]);

    // Execute the query to insert the sample data
    await executeQuery(insertQuery, [values]);
    console.log('Sample data inserted into the Texts table');
  } catch (error) {
    console.error('Error creating texts table:', error);
  }
}

module.exports = {
  createTextsTable,
  executeQuery
};
