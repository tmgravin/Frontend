import Footer from "@/components/non-authenticted/footer/Footer";
import HelpAndSupport from "@/components/non-authenticted/HelpAndSupport";
import React from "react";

function page() {
  return (
    <div className="">
      <HelpAndSupport />
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default page;
