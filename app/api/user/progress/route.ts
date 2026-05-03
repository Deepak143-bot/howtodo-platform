import { MongoClient } from 'mongodb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 0.1 });

  const { roadmapId, stepIndex, completed } = await req.json();
  const client = new MongoClient(process.env.MONGODB_URI!);
  
  try {
    await client.connect();
    const db = client.db('howtodo_db');
    
    // Update the user's progress for this specific roadmap
    await db.collection('user_progress').updateOne(
      { userId, roadmapId },
      { 
        $set: { [`steps.${stepIndex}`]: completed },
        $setOnInsert: { lastUpdated: new Date() }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } finally {
    await client.close();
  }
}
