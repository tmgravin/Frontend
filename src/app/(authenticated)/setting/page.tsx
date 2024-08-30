import React from "react";
import dynamic from "next/dynamic";
const SettingPage = dynamic(
  () => import("@/components/authenticated/setting/SettingPage"),
  {
    ssr: false,
  }
);

function page() {
  return (
    <div>
      <SettingPage />
    </div>
  );
}

export default page;
