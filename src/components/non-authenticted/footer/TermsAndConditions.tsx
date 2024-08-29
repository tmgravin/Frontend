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
          our projects system, which includes the roles of Creator, Doer, and
          the overarching control by the Admin. By accessing or using our
          services, you agree to comply with these Terms and Conditions.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Definitions</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Creator:</strong> A user who creates and submits project
            requests through the MSP Academy system.
          </li>
          <li>
            <strong>Doer:</strong> A user who receives, completes, and submits
            projects based on requests from creators.
          </li>
          <li>
            <strong>Admin:</strong> The individual or entity responsible for
            managing and overseeing the projects system, including user
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
        </ul>

        <h3 className="font-semibold mb-1">3.2 Doer</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Responsible for completing projects according to the instructions
            provided by the creator.
          </li>
          <li>
            Must ensure that all work is original, free of plagiarism, and
            submitted on time.
          </li>
          <li>
            Is required to communicate with the creator if clarification or
            additional information is needed.
          </li>
        </ul>

        <h3 className="font-semibold mb-1">3.3 Admin</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Oversees the management of the projects system, including user
            registration, role assignments, and compliance with these Terms and
            Conditions.
          </li>
          <li>
            Has the authority to review, approve, or reject projects and handle
            disputes between creators and doers.
          </li>
          <li>
            Ensures the security and confidentiality of all user data and
            projects.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. User Accounts</h2>

        <h3 className="font-semibold mb-1">4.1 Registration</h3>
        <p className="mb-4">
          Users must register and create an account to access the projects
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
          unethical behavior.
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
          or approval. If revisions are required, the doer must address them in
          a timely manner.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Payment and Fees</h2>

        <h3 className="font-semibold mb-1">6.1 Payment Terms</h3>
        <p className="mb-4">
          Payment terms and fees for project services will be outlined in the
          user’s account and are subject to change with prior notice.
        </p>

        <h3 className="font-semibold mb-1">6.2 Payment Processing</h3>
        <p className="mb-4">
          Payments for completed projects are processed through the platform,
          and users are responsible for ensuring that their payment information
          is accurate and up to date.
        </p>

        <h3 className="font-semibold mb-1">6.3 Refunds and Disputes</h3>
        <p className="mb-4">
          Refunds may be issued under specific circumstances as outlined in our
          refund policy. Disputes regarding projects should be addressed through
          the platform’s dispute resolution process.
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
          All intellectual property rights related to projects and content
          created on the platform remain with the original creator or as agreed
          upon.
        </p>

        <h3 className="font-semibold mb-1">8.2 Usage Rights</h3>
        <p className="mb-4">
          Creators and Doers grant MSP Academy a non-exclusive, royalty-free
          license to use, display, and distribute projects as needed for the
          operation of the platform.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Dispute Resolution</h2>

        <h3 className="font-semibold mb-1">9.1 Dispute Process</h3>
        <p className="mb-4">
          Any disputes between creators and doers should be resolved through the
          platform’s dispute resolution process. The admin’s decision on
          disputes is final.
        </p>

        <h3 className="font-semibold mb-1">9.2 Governing Law</h3>
        <p className="mb-4">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of the Government of Nepal.
        </p>

        <h2 className="text-xl font-semibold mb-2">11. Contact Information</h2>
        <p className="mb-4">
          For any questions or concerns regarding these Terms and Conditions,
          please contact us at{" "}
          <a href="mailto:info@mspacademy.com">info@mspacademy.com</a>.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          12. Amendments to the Terms
        </h2>
        <p>
          MSP Academy reserves the right to modify or update these Terms and
          Conditions at any time. Changes will be effective upon posting on our
          website, and users will be notified of any significant updates.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
