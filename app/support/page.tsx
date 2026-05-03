import Link from 'next/link';

export default function Support() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black p-8 font-sans">
      <div className="max-w-3xl mx-auto pt-20">
        <h1 className="font-marker text-6xl mb-8">Support Center</h1>
        <p className="font-serif italic text-2xl text-gray-500 mb-12">How can we help you navigate the world?</p>
        <div className="space-y-8">
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-marker text-2xl mb-2">Frequently Asked Questions</h3>
            <p className="text-gray-600">Find quick answers about roadmap accuracy and premium features.</p>
          </div>
          <Link href="/contact" className="block p-6 bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <h3 className="font-marker text-2xl mb-2 text-[#ff7e33]">Still stuck?</h3>
            <p className="opacity-80">Our global team is ready to assist you. Contact us directly →</p>
          </Link>
        </div>
        <Link href="/" className="inline-block mt-12 font-marker text-lg border-b-2 border-black">← Back to Home</Link>
      </div>
    </main>
  );
}
