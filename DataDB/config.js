const Mongo = require('mongodb');
// We have to access the MongoClient class from this Mongo instance
const MongoClient = Mongo.MongoClient;
// string copied from Mongodb web to connect to my cluster
const url =
  'mongodb+srv://admin:Boomerang.zaida91@first-cluster.f7gsclw.mongodb.net/employees-database?retryWrites=true&w=majority';
// We must tell to MongoDb which server we want to connect to
const client = new MongoClient(url);

exports.client = client;
