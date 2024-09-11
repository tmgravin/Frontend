import React from "react";
import Header from "./Header";
import Footer from "../footer/Footer";
import EbookManager from "./Ebook";
// import SearchEbookModal from "./EbookSearchByCatagory";

function EbookHome() {
  return (
    <div>
      <Header />

      <EbookManager />

      <Footer />
    </div>
  );
}

export default EbookHome;
