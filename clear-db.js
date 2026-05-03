const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    await client.db('howtodo_db').collection('guides').deleteMany({});
    console.log('✅ Database cleared! The AI will now generate brand new detailed guides.');
  } finally { await client.close(); }
}
run();
