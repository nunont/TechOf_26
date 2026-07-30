
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 
"mongodb+srv://nunomarques:KrJpJUtsrCVqrJ3S@techof.dol23.mongodb.net/?appName=TechOf"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("toyshop");
    const toysCollection = db.collection("toys");

    const body = [
      {
        name: "Bola de Futebol",
        description: "Bola de futebol oficial da Copa do Mundo",
        price: 49.99,
        categories: ["Desporto", "Futebol"],
      },
      {
        name: "Lego do Harry Potter",
        description: "Conjunto de construção Lego do mundo de Harry Potter",
        price: 79.99,
        categories: ["Brinquedos", "Lego", "Harry Potter"],
      },
      {
        name: "Catan",
        description: "Jogo de tabuleiro estratégico para 3-4 jogadores",
        price: 39.99,
        categories: ["Jogos de Tabuleiro", "Estratégia"],
      }
    ];

    const result = await toysCollection.insertMany(body);
    console.log(`${result.insertedCount} documentos inseridos com sucesso.`, 
      result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
