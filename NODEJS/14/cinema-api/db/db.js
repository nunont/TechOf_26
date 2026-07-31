const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 
"mongodb+srv://nunomarques:KrJpJUtsrCVqrJ3S@techof.dol23.mongodb.net/?appName=TechOf"

let client;
let db;

const connectDb = async () => {
    try {
        client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
        await client.connect();

        db = client.db('cinema');

        console.log("MongoDb foi ligado com sucesso");

    } catch (error) {
        console.error("Erro ao ligar ao Mongo Db e base de dados", error);
        process.exit(1);
    }
}

const getDb = () => {
    if (!db){
        throw new Error("Base de dados não inicializada")
    }
    return db;
}

module.exports = { connectDb, getDb };