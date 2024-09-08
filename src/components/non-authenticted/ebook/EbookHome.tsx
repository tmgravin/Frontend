import React from "react";
import Ebook from "./Ebook";
import Header from "./Header";
import Footer from "../footer/Footer";

function EbookHome() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Ebook />
      </div>
      <Footer />
    </div>
  );
}

export default EbookHome;
