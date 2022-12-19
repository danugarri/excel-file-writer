const { client } = require('../config');

const getEmployeesInternally = async () => {
  let employees = [];
  try {
    await client.connect();
    const db = client.db();
    employees = await db.collection('employees').find().toArray();
  } catch (error) {
    return 'We could not get data';
  }
  console.log(employees);
  // To finish we have to close the connection to the database
  client.close();
  return employees;
};

module.exports = { getEmployeesInternally };
