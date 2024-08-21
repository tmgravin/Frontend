import React from "react";

function Footer() {
  return (
    <div className="flex flex-col w-full text-white footer-bg pb-8">
      <div className="p-4 text-center">MSP Assignment</div>

      <div className="flex flex-col lg:flex-row lg:justify-around px-2">
        {/* Column 1 */}
        <div className="flex flex-col px-2">
          <div className="py-2 font-bold">Help and Support</div>
          <div>Contact@mspassignment</div>
          <div>Connect with us on social media</div>
          <div>&copy;2024-2040 Mspassignment.com</div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col px-2 mt-4 lg:mt-0">
          <div className="py-2 font-bold">Home</div>
          <div>Post assignment</div>
          <div>About Us</div>
          <div>Feedback</div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col px-2 mt-4 lg:mt-0">
          <div className="py-2 font-bold">Trust, Safety & Security</div>
          <div>Help & Support</div>
          <div>Contact Us</div>
          <div>FAQ</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
