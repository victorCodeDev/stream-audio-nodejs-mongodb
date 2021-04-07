const { MongoClient } = require('mongodb');

let db;

MongoClient.connect('mongodb://localhost/trackdb', (err, client) => {
    if (err) {
        console.log(err);
        process.exit(0);
    }
    db = client.db('trackdb');
    console.log('Database is connected');
});


const getConnection = () => { return db };

module.exports = { getConnection }
