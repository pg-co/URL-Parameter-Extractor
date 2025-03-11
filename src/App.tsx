import React, { useState } from 'react';
import { LinkIcon, SearchIcon } from 'lucide-react';

function extractUrlParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch (error) {
    return {};
  }
}

function App() {
  const [url, setUrl] = useState<string>('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const extractedParams = extractUrlParams(url);
      setParams(extractedParams);
      setError('');
    } catch (err) {
      setError('Please enter a valid URL');
      setParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <LinkIcon className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-3 text-3xl font-bold text-gray-900">URL Parameter Extractor</h1>
          <p className="mt-2 text-gray-600">Enter a URL to extract and analyze its query parameters</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com?param1=value1&param2=value2"
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm min-h-[80px] resize-y"
                  style={{ lineHeight: '1.5' }}
                />
                <div className="absolute top-3 right-0 pr-3">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Extract Parameters
            </button>
          </form>

          {Object.keys(params).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Parameters Found:</h2>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {Object.entries(params).map(([key, value]) => (
                    <div key={key} className="px-4 py-3 flex flex-col sm:flex-row">
                      <dt className="text-sm font-medium text-gray-500 break-all sm:w-1/3">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900 break-all sm:mt-0 sm:w-2/3">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {Object.keys(params).length === 0 && url && !error && (
            <div className="mt-8 text-center text-gray-500">
              No parameters found in the URL
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;