"use client";
import React from "react";
import { useRouter } from "next/navigation";

function TermsAndConditions() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="m-4">
      <button
        onClick={handleBackClick}
        className="m-4 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
      >
        Back
      </button>
      <div className="max-w-3xl mx-auto px-8 py-8 border border-gray-300 bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Terms and Conditions for MSP Academy
        </h1>
        <p className="text-gray-600 mb-6">Effective Date: 2024.08.01</p>

        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to MSP Academy. These Terms and Conditions govern your use of
          our freelancing system, which includes the roles of Creator, Doer, and
          the overarching control by the Admin. By accessing or using our
          services, you agree to comply with these Terms and Conditions.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Definitions</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Creator:</strong> A user who creates and submits assignment
            requests through the MSP Academy system.
          </li>
          <li>
            <strong>Doer:</strong> A user who receives, completes, and submits
            assignments based on requests from Creators.
          </li>
          <li>
            <strong>Admin:</strong> The individual or entity responsible for
            managing and overseeing the freelancing system, including user
            management and ensuring compliance with these Terms and Conditions.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">
          3. Roles and Responsibilities
        </h2>

        <h3 className="font-semibold mb-1">3.1 Creator</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Responsible for submitting clear and detailed project requests.
          </li>
          <li>
            Must provide accurate information regarding project requirements,
            deadlines, and any specific instructions.
          </li>
          <li>
            Is accountable for reviewing and accepting the completed projects.
          </li>
          <li>
            Creators can make the payment upfront, partial, or after completion
            notifications. Completed projects will be visible only after
            complete payment.
          </li>
          <li>
            Creators can choose to be fixed, hourly, or tasked based payments by
            themselves.
          </li>
          <li>
            Creators can choose their project doer by themselves from multiple
            applicants.
          </li>
          <li>Can review the doer after completion of the project.</li>
        </ul>

        <h3 className="font-semibold mb-1">3.2 Assignment Doer</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Responsible for completing projects according to the instructions
            provided by the Creator.
          </li>
          <li>
            Must ensure that all work is original, free of plagiarism, and
            submitted on time.
          </li>
          <li>Must complete the projects before the deadline.</li>
        </ul>

        <h3 className="font-semibold mb-1">3.3 Admin</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Oversees the management of the freelancing system, including user
            registration, role assignments, and compliance with these Terms and
            Conditions.
          </li>
          <li>
            Has the authority to review, approve, or reject projects and handle
            disputes between Creators and Doers.
          </li>
          <li>
            Ensures the security and confidentiality of all user data and
            assignments.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. User Accounts</h2>

        <h3 className="font-semibold mb-1">4.1 Registration</h3>
        <p className="mb-4">
          Users must register and create an account to access the freelancing
          system. Registration requires providing accurate personal information
          and agreeing to these Terms and Conditions.
        </p>

        <h3 className="font-semibold mb-1">4.2 Account Security</h3>
        <p className="mb-4">
          Users are responsible for maintaining the confidentiality of their
          account credentials and for all activities that occur under their
          account.
        </p>

        <h3 className="font-semibold mb-1">4.3 Account Termination</h3>
        <p className="mb-4">
          The admin reserves the right to suspend or terminate any user account
          that violates these Terms and Conditions or engages in fraudulent or
          unethical behavior. The admin can also suspend a creator if any
          payment is unclear and a doer if the projects are not completed within
          the time frame and if there are bad reviews from the creator.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          5. Project Submission and Completion
        </h2>

        <h3 className="font-semibold mb-1">5.1 Project Requests</h3>
        <p className="mb-4">
          Creators must provide clear and complete instructions when submitting
          project requests. Any incomplete or unclear instructions may result in
          delays or disputes.
        </p>

        <h3 className="font-semibold mb-1">5.2 Project Completion</h3>
        <p className="mb-4">
          Doers are expected to complete projects in accordance with the
          provided instructions and within the specified deadlines. Failure to
          do so may result in penalties or account suspension.
        </p>

        <h3 className="font-semibold mb-1">5.3 Review and Approval</h3>
        <p className="mb-4">
          Creators must review completed projects promptly and provide feedback
          or approval. If revisions are required, the Doer must address them in
          a timely manner.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Payment and Fees</h2>

        <h3 className="font-semibold mb-1">6.1 Payment Terms</h3>
        <p className="mb-4">
          Payment terms and fees for assignment services will be outlined in the
          user’s account and are subject to change with prior notice.
        </p>

        <h3 className="font-semibold mb-1">6.2 Payment Processing</h3>
        <p className="mb-4">
          Payments for completed assignments are processed through the platform,
          and users are responsible for ensuring that their payment information
          is accurate and up to date.
        </p>
        <p className="mb-4">
          Twenty percent (20%) of the service charge will be deducted from the
          cost of the project. Payment will be made only after the payment is
          received from the creator. Must be liable themselves for the payment
          if the project is from unverified payment creators.
        </p>

        <h3 className="font-semibold mb-1">6.3 Refunds</h3>
        <p className="mb-4">
          Refunds may be issued under specific circumstances if the Doer does
          not fulfill all the conditions specified in the project. MSP Academy
          will review all the conditions. There will be a 10% deduction in
          refund from the total project cost.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          7. Confidentiality and Data Protection
        </h2>

        <h3 className="font-semibold mb-1">7.1 Confidentiality</h3>
        <p className="mb-4">
          All users are required to keep project details and personal
          information confidential. Unauthorized sharing of information is
          prohibited.
        </p>

        <h3 className="font-semibold mb-1">7.2 Data Protection</h3>
        <p className="mb-4">
          We are committed to protecting your personal data and will handle it
          in accordance with our Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Intellectual Property</h2>

        <h3 className="font-semibold mb-1">8.1 Ownership</h3>
        <p className="mb-4">
          All intellectual property rights related to assignments and content
          created on the platform remain with the original creator or as agreed
          upon.
        </p>

        <h3 className="font-semibold mb-1">8.2 Usage Rights</h3>
        <p className="mb-4">
          Creators will have all rights reserved for their projects. MSP Academy
          will not use these projects&apos; information for others.
        </p>

        <h2 className="text-xl font-semibold mb-2">11. Contact Information</h2>
        <p className="mb-4">
          For any questions or concerns regarding these Terms and Conditions,
          please contact us at:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Email:{" "}
            <a
              href="mailto:info@mspacademy.co"
              className="text-blue-500 hover:underline"
            >
              info@mspacademy.co
            </a>
          </li>
          <li>
            Website:{" "}
            <a
              href="https://mspacademy.co/"
              className="text-blue-500 hover:underline"
            >
              https://mspacademy.co/
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TermsAndConditions;
