import React from 'react';

function ApplicationProcess() {
  return (
    <div className="bg-gray-100 p-10">
      <div className='flex primary-green items-center justify-center font-bold p-5'>Simple Application Process</div>
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="relative flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">1</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-5 text-center text-xs py-5">Skills Survey</div>
          </div>
          {/* Line between steps */}
          <div className="flex-auto border-t-4 border-blue-500"></div>
          {/* Step 2 */}
          <div className="relative flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">2</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-5 text-center text-xs py-5">Qualification Test</div>
          </div>
          {/* Line between steps */}
          <div className="flex-auto border-t-4 border-orange-500"></div>
          {/* Step 3 */}
          <div className="relative flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-gray-600 flex items-center justify-center">3</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-5 text-center text-xs py-5">Sample Essay</div>
          </div>
          {/* Line between steps */}
          <div className="flex-auto border-t-4 border-orange-500"></div>
          {/* Step 4 */}
          <div className="relative flex items-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-gray-600 flex items-center justify-center">4</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-5 text-center text-xs py-5">ID Verification</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationProcess;
