import React from "react";
import dynamic from "next/dynamic";
import SettingPage from "@/components/authenticated/setting/SettingPage";

function page() {
  return (
    <div>
      <SettingPage />
    </div>
  );
}

export default page;
