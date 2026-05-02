import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    await client.connect();
    const db = client.db('howtodo_db');
    const guides = db.collection('guides');

    if (query) {
      // Search for specific guides
      const results = await guides.find({
        title: { $regex: query, $options: 'i' }
      }).toArray();
      return NextResponse.json(results);
    } else {
      // Return the 6 most recent guides for the "Library" view
      const latest = await guides.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();
      return NextResponse.json(latest);
    }
  } catch (e) {
    return NextResponse.json([]);
  } finally {
    await client.close();
  }
}
