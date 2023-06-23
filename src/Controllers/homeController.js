// Import necessary dependencies
const { createTextsTable } = require('./../BDD/database');
const { executeQuery } = require('./../BDD/database');


// Create the texts table in the database
createTextsTable();

// Define a function for getting data from the texts table
async function getTexts(req, res) {
    try {
      const query = 'SELECT * FROM Texts';
      const texts = await executeQuery(query);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(texts));
    } catch (error) {
      console.error(error); 
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve texts from the database' }));
    }
}
  

module.exports = {
  getTexts
};
