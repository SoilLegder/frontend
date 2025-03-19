import Link from 'next/link';
import { useRouter } from 'next/router';

function Error({ statusCode, err }) {
  const router = useRouter();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-yellow-600 dark:text-yellow-500">
          {statusCode || 'Error'}
        </h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {statusCode
            ? `An error ${statusCode} occurred on the server`
            : 'An error occurred on the client'}
        </p>
        {err && process.env.NODE_ENV !== 'production' && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded text-left overflow-x-auto max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 text-sm font-mono">
              {err.message}
            </p>
          </div>
        )}
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Return to home
          </Link>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error; 