
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const deletedToy = await toysCollection
      .deleteOne({ _id: new ObjectId("6a68fe8ce5e0c5ddbb37b9bf")})
    console.log(deletedToy)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
