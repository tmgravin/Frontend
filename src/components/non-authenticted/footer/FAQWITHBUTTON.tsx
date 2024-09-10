"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FAQ from "./FAQ";

function FAQWITHBUTTON() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <button
        onClick={handleBackClick}
        className="m-4 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
      >
        Back
      </button>

      <FAQ />
    </div>
  );
}

export default FAQWITHBUTTON;
