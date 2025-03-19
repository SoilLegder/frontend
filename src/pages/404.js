import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  
  // Optional: Automatically redirect after a time delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000); // redirect after 10 seconds
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-700 dark:text-green-500">404</h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
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
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          You'll be automatically redirected to the homepage in a few seconds...
        </p>
      </div>
    </div>
  );
} 