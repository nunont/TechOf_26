
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

    const customersCollection = client.db("toyshop").collection("customers");
    const filter = {
      _id : new ObjectId("6a6b8cf95bc3ecec0ec2516e")
    };
    const body = {
      name: "Nuno Marques",
      email: "nuno@example.com",
      address: {
        street: "Rua das Flores",
        postalCode: "8800-343",
        city: "Tavira",
        district: "Algarve",
        country: "Portugal"
      }
    }
    var updatedCustomer = await customersCollection
      .replaceOne(filter, body);
    console.log(updatedCustomer)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
