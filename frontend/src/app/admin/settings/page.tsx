export default function SystemSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">System Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">AI & OCR Providers</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">AI Claim Assistant Engine</p>
              <p className="text-sm text-gray-500">Currently configured to: Mock AI Service</p>
            </div>
            <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Configure</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">OCR Extraction Engine</p>
              <p className="text-sm text-gray-500">Currently configured to: Mock Vision Service</p>
            </div>
            <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Configure</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Feature Flags</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="text-gray-900 font-medium">Enable User Registration</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="text-gray-900 font-medium">Enable Email Notifications (Mock)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-gray-900 font-medium">Maintenance Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
}
