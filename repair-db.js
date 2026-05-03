const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('howtodo_db');
    const collection = db.collection('guides');
    const guides = await collection.find({}).toArray();
    
    console.log(`Checking ${guides.length} guides...`);
    
    for (const guide of guides) {
      const cleanTitle = guide.title.trim();
      if (guide.title !== cleanTitle) {
        await collection.updateOne(
          { _id: guide._id },
          { $set: { title: cleanTitle } }
        );
        console.log(`✅ Fixed: "${guide.title}" -> "${cleanTitle}"`);
      }
    }
    console.log('Database repair complete!');
  } finally {
    await client.close();
  }
}
run();
