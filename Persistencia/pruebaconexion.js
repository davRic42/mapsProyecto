const connection = require('./db');

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) {
    console.error('Error in query:', error.message);
    connection.end();
    return;
  }
  console.log('The solution is:', results[0].solution);  // Debería imprimir "The solution is: 2"
  connection.end();
});
