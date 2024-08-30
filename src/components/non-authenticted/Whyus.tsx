import React from "react";

interface WhyusProps {
  onGetStartedClick: () => void;
}

const Whyus: React.FC<WhyusProps> = ({ onGetStartedClick }) => {
  return (
    <div className="w-full lg:h-screen  text-white flex flex-row justify-around items-end px-4 pt-5  bg-blue-800">
      {/* Apply the background image only on large screens */}
      <div
        className=" sm:h-screen hidden lg:block" // Ensure it takes the full height of the viewport
        style={{
          backgroundImage: "url('/why-us.png')", // Ensure the correct path and extension
          backgroundSize: "contain", // Cover will ensure the image fills the div proportionally
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          width: "50%", // To make the div cover the left half of the screen
        }}
      ></div>

      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center  pb-10   ">
        <div className="text-white text-4xl mb-0 text-left underline pt-5">
          Why us?
        </div>

        <div className="flex flex-col w-full mt-12 space-y-8">
          {/* Support Section */}
          <div className="text-left">
            <div className="text-2xl mb-2">
              Support <i className="fa-solid fa-headset"></i>
            </div>
            <div className="text-sm">
              Our dedicated support team works 24/7 to resolve all of your
              queries over the phone or email, no matter where you are located.
            </div>
          </div>

          {/* Credibility Section */}
          <div className="text-left">
            <div className="text-2xl mb-2">
              Credibility <i className="fa-solid fa-handshake text-white"></i>
            </div>
            <div>
              We verify freelancers, publish their feedback, scores, and
              All-Time Transactions Data to help you identify time-tested
              professionals across the globe.
            </div>
          </div>

          {/* Flexibility Section */}
          <div className="text-left">
            <div className="text-2xl mb-2">
              Flexibility <i className="fa-solid fa-stopwatch text-white"></i>
            </div>
            <div>
              Our platform adapts to your needs, providing the flexibility to
              work according to your schedule and preferences.
            </div>
          </div>

          {/* Security Section */}
          <div className="text-left">
            <div className="text-2xl mb-2">
              Security <i className="fa-solid fa-user-shield text-white"></i>
            </div>
            <div>
              We offer safe payment protection and your choice of preferred
              payment method for financial peace of mind.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
