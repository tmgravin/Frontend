import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-col w-full text-white primary-navy-bluebg pb-8 pt-10">
      <div className="flex flex-col lg:flex-row lg:justify-around px-2">
        {/* Column 1 */}
        <div className="flex flex-col px-2">
          <div className="text-2xl font-bold">MSP Academy</div>
          <div className="py-2 font-bold underline">Contact us</div>
          <div className="flex flex-row">
            <i className="fa-regular fa-envelope"></i>{" "}
            <div className="ml-2">mspacademy@gmail.com</div>
          </div>
          <div className="underline lg:pb-10">
            <i className="fa-solid fa-globe"></i>{" "}
            <a href="https://www.mspacademy.co">www.mspacademy.co</a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col px-2 mt-4 lg:mt-0">
          <Link href="/homepage">
            <div className="py-2 font-bold cursor-pointer">Home</div>
          </Link>
          <Link href="/about-us">
            <div className="cursor-pointer">About Us</div>
          </Link>
          <Link href="/ebook">
            <div className="cursor-pointer">e-book</div>
          </Link>
          <Link href="/feedback">
            <div className="cursor-pointer">Feedback</div>
          </Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col px-2 mt-4 lg:mt-0">
          <div className="py-2"></div>
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage/termsandconditions`}
          >
            <div className="underline cursor-pointer">Terms & Conditions</div>
          </Link>
          <Link href="/help-support">
            <div className="cursor-pointer underline">Help & Support</div>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage/faq`}>
            <div className="underline cursor-pointer">FAQ</div>
          </Link>
        </div>
      </div>

      <hr className="text-white pt-2" />
      <div className="flex lg:flex-row lg:justify-around">
        <div className="flex  items-center pt-2">&copy;2024 | MSPacademy.co</div>

        <div className="flex flex-row">
          <div className="underline cursor-pointer flex  ">
            Connect with Us:
          </div>
          <div className="flex flex-row space-x-2 ml-3">
            <Link
              href={`https://www.facebook.com/profile.php?id=61563941840402`}
            >
              {" "}
              <i className="fa-brands fa-facebook"></i>{" "}
            </Link>
            <Link
              href={`https://www.instagram.com/mspacademy.co?igsh=MTR1ODYwNnBpdXV0cQ==`}
            >
              {" "}
              <i className="fa-brands fa-instagram"></i>{" "}
            </Link>
            <Link href={``}>
              {" "}
              <i className="fa-brands fa-linkedin"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
