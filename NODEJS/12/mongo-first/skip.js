
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

    const toysCollection = client.db("toyshop").collection("toys");
    const allToys = await toysCollection
      .find()
      .sort({ price: -1 }) // Sort by price in descending order
      .skip(1) // Skip the first document
      .limit(1)
      .toArray();
    console.log(allToys)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
