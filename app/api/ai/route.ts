import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const systemPrompt = `You are an expert guide. Create a 4-step roadmap for: "${prompt}".
Respond ONLY with a raw JSON array. No markdown, no formatting.
CRITICAL RULES:
1. Do NOT include "Step 1:", "Step 2:", etc., in the title. Just the name of the action.
2. Format EXACTLY like this:
[
  {
    "title": "Register Your Business",
    "desc": "Before selling anything, you need to be legally registered.",
    "checklist": ["Apply for registration", "Get a PAN card"],
    "tip": "Sole Proprietorship is the simplest.",
    "tools": ["GST Portal", "Razorpay"]
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
    const steps = JSON.parse(cleanedText);

    return NextResponse.json({ steps });
  } catch (e) { 
    return NextResponse.json({ steps: [] }); 
  }
}
