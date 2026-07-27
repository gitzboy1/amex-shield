import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Protected Purchases</span>
          <span className="text-4xl font-bold text-blue-600 mt-2">12</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Benefits</span>
          <span className="text-4xl font-bold text-green-600 mt-2">18</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Claims</span>
          <span className="text-4xl font-bold text-purple-600 mt-2">2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Protected Purchases */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Protected Purchases</h2>
            <div className="space-y-4">
              <Link href="/dashboard/purchase/sony-headphones" className="block border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">Sony Headphones</h3>
                    <p className="text-sm text-gray-500">Sony Store • 24 Jul 2026</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900">$349.00</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Protected ✅
                    </span>
                  </div>
                </div>
              </Link>

              <div className="block border border-gray-200 rounded-lg p-4 opacity-60">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">Delta Airlines Flight</h3>
                    <p className="text-sm text-gray-500">Delta • 10 Jul 2026</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900">$850.00</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Protected ✅
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coverage Timeline */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Coverage Timeline</h2>
            <div className="relative border-l border-gray-200 ml-3 space-y-6">
              <div className="mb-8 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">Purchase Protection Expires Soon</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Sony Headphones - in 2 days</time>
                <p className="text-base font-normal text-gray-500">Your 90-day purchase protection for accidental damage is ending.</p>
              </div>
              <div className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Trip Delay Coverage Active</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Delta Airlines - starting Aug 1</time>
                <p className="text-base font-normal text-gray-500">You are covered up to $500 for reasonable expenses if your flight is delayed more than 6 hours.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Notifications */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
            <ul className="space-y-4">
              <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-900">Your claim for <strong>MacBook Pro</strong> has been approved.</p>
                <span className="text-xs text-blue-600 mt-1 block">2 hours ago</span>
              </li>
              <li className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-900">Return protection expiring for <strong>Nike Shoes</strong>.</p>
                <span className="text-xs text-yellow-600 mt-1 block">1 day ago</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
