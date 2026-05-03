export default function Cookies() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black p-8 font-sans">
      <div className="max-w-3xl mx-auto pt-20">
        <h1 className="font-marker text-5xl mb-8">Cookie Policy</h1>
        <div className="font-serif text-lg text-gray-600 space-y-6 leading-relaxed">
          <p>We use essential cookies to keep you signed in via Clerk and to remember your roadmap progress locally.</p>
          <p><strong>Essential:</strong> These cookies are required for the site to function (Auth & Progress tracking).</p>
          <p><strong>Analytics:</strong> We use minimal analytics to see which countries are searching for what guides, helping us improve the AI.</p>
        </div>
      </div>
    </main>
  );
}
