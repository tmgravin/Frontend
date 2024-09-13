import React from "react";
import Header from "./Header";
import Footer from "../footer/Footer";
import EbookManager from "./Ebook";
import Searchbar from "./EbookSearchByCatagory";
// import SearchEbookModal from "./EbookSearchByCatagory";

function EbookHome() {
  return (
    <div>
      <Header />
      <Searchbar />
      <EbookManager />

      <Footer />
    </div>
  );
}

export default EbookHome;
