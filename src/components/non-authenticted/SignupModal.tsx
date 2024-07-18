import React from 'react';
import Link from 'next/link';

function SignupModal() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        
        <div className="mb-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Sign Up as Student
          </button>
        </div>

        <div className="mb-4">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Sign Up as Teacher
          </button>
        </div>

        <div className="text-center mt-4">
          Already have an account? <Link href="/signin"><a className="text-blue-500 hover:underline">Sign In</a></Link>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
