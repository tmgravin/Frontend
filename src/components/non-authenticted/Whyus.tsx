import React from "react";

interface WhyusProps {
  onGetStartedClick: () => void;
}

const Whyus: React.FC<WhyusProps> = ({ onGetStartedClick }) => {
  return (
    <div className="w-full bg-whayus-bg lg:min-h-screen text-white flex flex-col items-center px-4 lg:px-0 bg-[#0A4AC5] lg:bg-whyus-bg lg:bg-[40%] lg:bg-bottom[-14%] lg:bg-no-repeat pt-5 lg:pb-0">
      <div className="text-white text-4xl mb-0 text-center underline">
        Why us?
      </div>

      <div className="flex flex-col lg:flex-row w-full mt-12">
        {/* Left Column */}
        <div className="flex flex-col lg:w-1/2 items-start lg:items-end lg:pr-40 mb-8 lg:mb-0">
          <div className="m-2 text-center ">
            <div className="text-2xl">
              Support <i className="fa-solid fa-headset"></i>
            </div>
            <div className="text-sm">
              Our dedicated support team works 24/7 to resolve all of your
              queries over the phone or email, no matter where you are located.
            </div>
          </div>
          <div className="m-2 text-center ">
            <div className="text-2xl">
              Credibility <i className="fa-solid fa-handshake text-white"></i>
            </div>
            <div>
              We verify freelancers, publish their feedback, scores, and
              All-Time Transactions Data to help you identify time-tested
              professionals across the globe.
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col lg:w-1/2 items-center lg:items-start lg:pl-40">
          <div className="m-2 text-center">
            <div className="text-2xl">
              <i className="fa-solid fa-stopwatch text-white"></i> Flexibility
            </div>
            <div>
              Our platform adapts to your needs, providing the flexibility to
              work according to your schedule and preferences.
            </div>
          </div>
          <div className="m-2 text-center ">
            <div className="text-2xl">
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
