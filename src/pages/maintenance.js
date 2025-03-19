import Head from 'next/head';

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Under Maintenance - SoiLedger</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md text-center">
          <svg className="w-24 h-24 mx-auto text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">We're under maintenance</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            SoiLedger is currently undergoing scheduled maintenance. We'll be back shortly!
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700">
              Estimated completion: 2 hours
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            For urgent inquiries, please contact <a href="mailto:support@soiledger.com" className="text-green-700 dark:text-green-500 hover:underline">support@soiledger.com</a>
          </p>
        </div>
      </div>
    </>
  );
} 