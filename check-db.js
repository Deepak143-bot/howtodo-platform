const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('howtodo_db');
    const collection = db.collection('guides');
    const count = await collection.countDocuments();
    console.log('\n---------------------------------');
    console.log(`✅ DATABASE STATUS: WORKING`);
    console.log(`📚 TOTAL GUIDES SAVED: ${count}`);
    console.log('---------------------------------\n');
    
    if (count > 0) {
      const latest = await collection.findOne({}, { sort: { _id: -1 } });
      console.log(`🆕 LATEST SAVED GUIDE: "${latest.title}"`);
    }
  } catch (err) {
    console.error('❌ CONNECTION ERROR:', err.message);
  } finally {
    await client.close();
  }
}
run();
