import React from "react";
import CFooter from "./CFooter";
import CHead from "./CHead";
import CNav from "./CNav";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <CHead />
      <CNav />
      <>
        <div>{children}</div>
        <div className="border border-gray100"></div>
        <CFooter />
      </>
    </div>
  );
};

export default Layout;
