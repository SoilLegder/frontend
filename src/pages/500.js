import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600 dark:text-red-500">500</h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Server Error</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          We're sorry, something went wrong on our end.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Our team has been notified and is working to fix the issue.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Return to home
          </Link>
          <button
            onClick={() => router.reload()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
          >
            Try again
          </button>
        </div>
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">If the problem persists, please contact support:</p>
          <a 
            href="mailto:support@soiledger.com" 
            className="text-sm text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
          >
            support@soiledger.com
          </a>
        </div>
      </div>
    </div>
  );
} 