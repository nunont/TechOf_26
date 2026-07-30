
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

    const customersCollection = client.db("toyshop").collection("customers");
    

    const filter = { 
      "address.district": "Algarve",
      "address.city": "Tavira"
    };
    const allCustomers = await customersCollection.find(filter).toArray();
    console.log(allCustomers)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
