import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const systemPrompt = `You are a professional roadmap architect. Create a 4-step roadmap for: "${prompt}".
Respond ONLY with a raw JSON array.
CRITICAL: For each step, provide a "videoQuery" which is a perfect search term to find a tutorial for that specific step on YouTube.
Format:
[
  {
    "title": "Action Name",
    "desc": "Explanation.",
    "checklist": ["Task 1", "Task 2"],
    "videoQuery": "How to [Action Name] tutorial 2026",
    "tip": "Insight.",
    "tools": ["Tool A"]
  }
]`;

    let aiText = "";
    if (process.env.GROQ_API_KEY) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          model: "llama-3.3-70b-versatile", 
          messages: [{ role: "user", content: systemPrompt }],
          temperature: 0.2
        })
      });
      const groqData = await groqRes.json();
      if(groqData.choices) aiText = groqData.choices[0].message.content;
    }

    const cleanedText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    return NextResponse.json({ steps: JSON.parse(cleanedText) });
  } catch (e) { return NextResponse.json({ steps: [] }); }
}
