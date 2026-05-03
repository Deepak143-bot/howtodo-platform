export default function Contact() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black p-8 font-sans">
      <div className="max-w-3xl mx-auto pt-20">
        <h1 className="font-marker text-6xl mb-8">Get in Touch</h1>
        <div className="grid gap-8">
          <div className="border-[3px] border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <form className="space-y-6">
              <div>
                <label className="block font-marker text-sm uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full p-4 border-2 border-black outline-none font-serif italic" placeholder="you@world.com" />
              </div>
              <div>
                <label className="block font-marker text-sm uppercase tracking-widest mb-2">Message</label>
                <textarea className="w-full p-4 border-2 border-black outline-none font-serif italic h-32" placeholder="I need help with..."></textarea>
              </div>
              <button className="w-full bg-black text-white py-4 font-marker text-xl uppercase tracking-widest hover:bg-[#ff7e33] transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
