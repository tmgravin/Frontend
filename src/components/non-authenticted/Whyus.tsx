import React from "react";

interface WhyusProps {
  onGetStartedClick: () => void;
}

const Whyus: React.FC<WhyusProps> = ({ onGetStartedClick }) => {
  return (
    <div className="w-full lg:h-screen text-white flex flex-col lg:flex-row justify-center items-center px-4 pt-5 bg-blue-800">
      {/* Apply the background image only on large screens */}
      <div
        className="hidden lg:block lg:w-1/2 lg:h-full"
        style={{
          backgroundImage: "url('/why-us.png')", // Ensure the correct path and extension
          backgroundSize: "80% auto", // Adjust the size as needed
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="w-full lg:w-1/2 h-full flex flex-col items-center  justify-center lg:justify-center lg:space-y-8 pb-10">
        <div className="text-white text-4xl mb-5 text-center flex items-center justify-center  underline">
          Why us?
        </div>

        <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-8 w-full space-y-8 lg:space-y-0">
          {/* Support Section */}
          <div className="text-left lg:col-span-1">
            <div className="text-2xl mb-2 flex items-center justify-center">
              Support <i className="fa-solid fa-headset"></i>
            </div>
            <div className=" flex items-center justify-center text-center">
              Our dedicated support team works 24/7 to resolve all of your
              queries over the phone or email, no matter where you are located.
            </div>
          </div>

          {/* Credibility Section */}
          <div className="text-left lg:col-span-1 ">
            <div className="text-2xl mb-2 flex items-center justify-center ">
              Credibility <i className="fa-solid fa-handshake text-white"></i>
            </div>
            <div className="flex items-center justify-center  text-center">
              We verify freelancers, publish their feedback, scores, and
              All-Time Transactions Data to help you identify time-tested
              professionals across the globe.
            </div>
          </div>

          {/* Flexibility Section */}
          <div className="text-left lg:col-span-1">
            <div className="text-2xl mb-2  flex items-center justify-center ">
              Flexibility <i className="fa-solid fa-stopwatch text-white"></i>
            </div>
            <div className="flex items-center justify-center  text-center">
              Our platform adapts to your needs, providing the flexibility to
              work according to your schedule and preferences.
            </div>
          </div>

          {/* Security Section */}
          <div className="text-left lg:col-span-1">
            <div className="text-2xl mb-2 flex items-center justify-center ">
              Security <i className="fa-solid fa-user-shield text-white"></i>
            </div>
            <div className="flex items-center justify-center  text-center">
              We offer safe payment protection and your choice of preferred
              payment method for financial peace of mind.
            </div>
          </div>

          {/* Additional Section */}
          <div className="text-left lg:col-span-1">
            {/* Add your additional section content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
