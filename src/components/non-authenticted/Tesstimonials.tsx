import React from "react";

function Tesstimonials() {
  return (
    <div className="w-full mx-4 sm:mx-6 lg:mx-8 mt-6">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        What Our Clients Say
      </h2>
      <div className="flex flex-wrap -mx-4">
        {/* <!-- Testimonial 1 --> */}
        <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://via.placeholder.com/64"
                alt="Client Photo"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-sm text-gray-600">CEO, Example Co.</p>
              </div>
            </div>
            <p className="text-gray-700">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.&quot;
            </p>
          </div>
        </div>

        {/* <!-- Testimonial 2 --> */}
        <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://via.placeholder.com/64"
                alt="Client Photo"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-600">
                  Marketing Director, Another Co.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              &quot;Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.&quot;
            </p>
          </div>
        </div>

        {/* <!-- Testimonial 3 --> */}
        <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://via.placeholder.com/64"
                alt="Client Photo"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Alex Johnson
                </h3>
                <p className="text-sm text-gray-600">
                  Product Manager, Tech Corp.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              &quot;Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tesstimonials;
