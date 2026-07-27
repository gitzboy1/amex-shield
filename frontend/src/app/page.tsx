import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
      <section className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Never Miss a Card Benefit Again
        </h1>
        <p className="text-xl text-gray-600">
          AMEX SHIELD proactively tracks your purchases, evaluates eligibility, and guides you through claims using AI.
        </p>
        <div className="pt-4">
          <Link 
            href="/dashboard" 
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Try Demo
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Automated Discovery</h3>
          <p className="text-gray-600">We analyze your transactions to instantly spot eligible protections.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Claim Assistant</h3>
          <p className="text-gray-600">Upload receipts and let AI extract data to pre-fill your claim forms.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold mb-2">Benefit Advisor</h3>
          <p className="text-gray-600">Ask questions and get recommendations on which card to use.</p>
        </div>
      </section>

      <section className="max-w-4xl text-left bg-blue-50 p-8 rounded-2xl w-full border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">About AMEX SHIELD</h2>
        <p className="text-blue-800 leading-relaxed">
          AMEX SHIELD is a hackathon prototype designed to bridge the gap between premium card benefits and customer awareness. By leveraging deterministic rules combined with AI-powered document extraction and explanations, we aim to provide a frictionless experience that maximizes the value of American Express memberships.
        </p>
      </section>
    </div>
  );
}
