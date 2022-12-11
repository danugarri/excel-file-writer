const Mongo = require('mongodb');
// We have to access the MongoClient class from this Mongo instance
const MongoClient = Mongo.MongoClient;
const url =
  'mongodb+srv://admin:Boomerang.zaida91@first-cluster.f7gsclw.mongodb.net/employees-database?retryWrites=true&w=majority';

// function to create employee
// All thid kind of querries are asynchronous
const createEmployee = async (req, res) => {
  // Object we are retrieving from the request( Frontend)
  // And afterwards this object will be sent to our database
  const newEmployee = {
    color: req.body.color,
    newEmployee: req.body.employeeName,
  };
  // We must tell to MongoDb which server we want to connect to
  const client = new MongoClient(url);
  //   ## stablishig CONNECTION ##
  //   Preventing form errors whrn creating an employee
  try {
    // This method stablishes the connection
    await client.connect();
    // Now we have to relate our DB to our client
    const db = client.db();
    // Now we have to access a collection inside our DB and store data in there
    // We have to provide a name to this collection to be created if this does not exist
    const collection = db.collection('employees');
    // And inside this collection we want to insert a new employee
    collection.insertOne(newEmployee);
    // And we return our newly created employee
  } catch (error) {
    return res.json({ message: 'We could not store data' });
  }
  res.json(newEmployee);
  // To finish we have to close the connection to the database
  // client.close();
};
const getEmployees = async (req, res) => {
  const client = new MongoClient(url);
  let employees = [];
  try {
    await client.connect();
    const db = client.db();
    employees = await db.collection('employees').find().toArray();
  } catch (error) {
    return res.json({ message: 'We could not get data' });
  }
  res.json(employees);
  // To finish we have to close the connection to the database
  client.close();
};
exports.createEmployee = createEmployee;
exports.getEmployees = getEmployees;
