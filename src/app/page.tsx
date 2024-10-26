import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
        <div className="card bg-base-100 shadow-xl w-full max-w-md p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Job Portal</h2>
          <p className="text-center text-gray-600 mb-6">
            Your next career opportunity awaits. Join us today and explore various job opportunities tailored just for you!
          </p>

          <div className="flex flex-col items-center mb-4">
            <Link href="/signup" className="btn btn-primary w-full mb-2">
              Sign Up
            </Link>
            <Link href="/login" className="btn btn-secondary w-full">
              Log In
            </Link>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">Featured Jobs</h3>
          <ul className="list-disc list-inside mb-4">
            <li>
              <Link href="/job/1" className="text-blue-600 hover:underline">
                Software Developer
              </Link>
            </li>
            <li>
              <Link href="/job/2" className="text-blue-600 hover:underline">
                Project Manager
              </Link>
            </li>
            <li>
              <Link href="/job/3" className="text-blue-600 hover:underline">
                UI/UX Designer
              </Link>
            </li>
          </ul>
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
