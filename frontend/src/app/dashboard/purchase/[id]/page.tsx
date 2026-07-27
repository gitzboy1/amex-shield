import Link from "next/link";

export default function PurchaseDetails() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline">&larr; Back</Link>
        <h1 className="text-3xl font-bold text-gray-900">Purchase Details</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sony Headphones</h2>
            <p className="text-gray-500 mt-1">Sony Store</p>
            <p className="text-gray-500 text-sm mt-1">Date: 24 Jul 2026</p>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-bold text-gray-900">$349.00</span>
            <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Purchase Protected ✅
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Active Benefits</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-100 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-blue-900">Purchase Protection</h4>
                <p className="text-sm text-blue-800 mt-1">Covers accidental damage or theft for 90 days.</p>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-blue-900">Coverage expires in:</span>
                <span className="block text-2xl font-bold text-blue-600">89 Days</span>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900">Extended Warranty</h4>
                <p className="text-sm text-gray-600 mt-1">Adds up to 1 extra year to the original manufacturer's warranty.</p>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-gray-900">Status:</span>
                <span className="block text-lg font-bold text-green-600">Active</span>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900">Return Protection</h4>
                <p className="text-sm text-gray-600 mt-1">Reimburses you if the merchant won't take it back within 90 days.</p>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-gray-900">Coverage expires in:</span>
                <span className="block text-lg font-bold text-blue-600">89 Days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
           <Link 
            href="/dashboard/claim" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            File a Claim
          </Link>
        </div>
      </div>
    </div>
  );
}
