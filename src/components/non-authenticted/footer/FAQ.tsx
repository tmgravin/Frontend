import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div>
      <div className="mt-10 mb-10 mx-auto p-8 bg-white border border-gray-300 shadow-lg max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-center underline">
          MSP Academy FAQ
        </h1>

        <div className="space-y-6">
          <div>
            <h2
              className="text-lg  font-semibold  cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(1)}
            >
              <span>1. What is MSP Academy?</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 1 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 1 && (
              <p className="pl-4 text-gray-700">
                MSP Academy is a platform designed to connect Creators, who need
                academic projects completed, with Doers, who complete these
                projects. The platform is overseen by an Admin who ensures
                smooth operations and compliance with our policies.
              </p>
            )}
          </div>

          <div>
            <h2
              className="text-lg font-semibold cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(2)}
            >
              <span>2. What are the roles within MSP Academy?</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 2 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 2 && (
              <ul className="pl-4 text-gray-700 list-disc">
                <li>
                  <strong>Creator:</strong> A user who submits project requests,
                  providing specific details and requirements for the task.
                </li>
                <li>
                  <strong>Doer:</strong> A user who accepts and completes
                  projects based on the instructions provided by the creator.
                </li>
              </ul>
            )}
          </div>

          <div>
            <h2
              className="text-lg font-semibold cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(3)}
            >
              <span>3. How do I register as an Creator or Doer?</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 3 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 3 && (
              <p className="pl-4 text-gray-700">
                To register, simply visit our registration page, select your
                role (Creator or Doer), and fill out the required information.
                Once your registration is complete, you’ll be able to start
                using the platform.
              </p>
            )}
          </div>

          <div>
            <h2
              className="text-lg font-semibold cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(4)}
            >
              <span>4. How does the as project process work?</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 4 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 4 && (
              <div className="pl-4 text-gray-700">
                <h3 className="font-semibold mb-1">For Creators:</h3>
                <ul className="list-disc mb-4">
                  <li>
                    Submit an project request with all necessary details and
                    instructions.
                  </li>
                  <li>
                    Review completed projectss and request revisions if
                    necessary.
                  </li>
                  <li>Approve the final submission and provide payment.</li>
                </ul>

                <h3 className="font-semibold mb-1">For Doers:</h3>
                <ul className="list-disc">
                  <li>
                    Browse available projects and choose one that matches your
                    skills.
                  </li>
                  <li>
                    Complete the projects according to the provided
                    instructions.
                  </li>
                  <li>
                    Submit the completed work for review and receive payment
                    once approved.
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <h2
              className="text-lg font-semibold cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(5)}
            >
              <span>5. How are payments handled on MSP Academy?</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 5 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 5 && (
              <p className="pl-4 text-gray-700">
                Payments are processed through the platform. Creators deposit
                the agreed amount when submitting an project request. Once the
                Doer completes and the Creator approves the work, the payment is
                released to the Doer.
              </p>
            )}
          </div>

          <div>
            <h2
              className="text-lg font-semibold cursor-pointer mb-2 flex items-center justify-between"
              onClick={() => toggleQuestion(6)}
            >
              <span>
                6. How does MSP Academy ensure the security of my data?
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  openQuestion === 6 ? "rotate-180" : "rotate-0"
                }`}
              />
            </h2>
            {openQuestion === 6 && (
              <p className="pl-4 text-gray-700">
                We prioritize the security and confidentiality of your data. All
                personal information and project details are protected by
                encryption and handled in accordance with our Privacy Policy.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
