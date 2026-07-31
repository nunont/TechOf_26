
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

function run() {
  client.connect()
    .then(() => {
      const customersCollection = client.db("toyshop").collection("customers");
      const filter = {
        _id : new ObjectId("6a6b8cf95bc3ecec0ec2516e")
      };
      const body = {
        $set: { 
          email: "nuno.marques@gmail.com"
        }
      };

      return customersCollection.findOneAndUpdate(filter, body, { returnDocument: 'after'});
    })
    .then((result) => {
      console.log(result)
    })
    .finally(() => client.close())
    .catch((error) => console.log(error))

}

run();
