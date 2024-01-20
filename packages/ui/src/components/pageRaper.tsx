import React, { FC } from "react";
import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const PageRaper: FC<Props> = ({ children }) => {
  return (
    <div
      style={{ height: "100vh", widows: "100vw", backgroundColor: "#eee" }}
      className="d-flex flex-column "
    >
      <Header />
      <main className="container justify-content-center align-items-center  flex-grow-1  d-flex m-auto ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageRaper;
