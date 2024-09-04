import React from "react";
import Ebook from "./Ebook";
import AdminHeader from "@/components/authenticated/admin/AdminHeader";

function EbookHome() {
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div>
        <Ebook />
      </div>
    </div>
  );
}

export default EbookHome;
