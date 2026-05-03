import { MongoClient } from 'mongodb';
import Link from 'next/link';

async function getOrGenerateGuide(slug: string) {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db('howtodo_db');
  const searchName = slug.split('-').join(' ').trim();
  
  // 1. Try to find it in the DB
  let guide = await db.collection('guides').findOne({ 
    title: { $regex: new RegExp(`^\\s*${searchName}\\s*$`, 'i') } 
  });

  // 2. If NOT found, call the AI to build it right now!
  if (!guide) {
    const systemPrompt = `Create a 4-step roadmap for: "${searchName}". Respond ONLY with raw JSON: [{"title":"Step Name","desc":"Explain","checklist":["task1","task2"],"videoQuery":"youtube search term"}]`;
    
    const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "user", content: systemPrompt }] })
    });
    
    const aiData = await aiRes.json();
    const steps = JSON.parse(aiData.choices[0].message.content.replace(/```json/g, '').replace(/```/g, ''));
    
    guide = { title: searchName, steps: steps, createdAt: new Date() };
    await db.collection('guides').insertOne(guide);
  }

  await client.close();
  return guide;
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getOrGenerateGuide(slug);

  return (
    <main className="min-h-screen bg-[#0f0f13] text-white p-6 font-sans">
      <div className="max-w-[600px] mx-auto pt-10 pb-32">
        <Link href="/" className="text-gray-500 font-marker hover:text-[#ff7e33] mb-10 block">← Back to World</Link>
        <h1 className="text-5xl font-marker font-bold mb-4 capitalize leading-tight">How to <span className="text-[#ff7e33]">{guide.title}</span></h1>
        <div className="w-20 h-1.5 bg-[#ff7e33] mb-12 rounded-full"></div>
        <div className="space-y-8">
          {guide.steps.map((step: any, i: number) => (
            <div key={i} className="bg-[#13141b] border border-[#2a2b36] p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#ff7e33] w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">{i + 1}</span>
                <h2 className="text-2xl font-marker font-bold">{step.title}</h2>
              </div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{step.desc}</p>
              <div className="bg-[#0a0a0d] p-6 rounded-2xl border border-gray-900">
                <h4 className="text-[10px] font-bold text-[#1db992] uppercase tracking-[0.2em] mb-4">Action Checklist</h4>
                <ul className="space-y-3">
                  {step.checklist.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 font-marker text-[17px]">
                      <span className="text-[#ff7e33] mt-1">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
