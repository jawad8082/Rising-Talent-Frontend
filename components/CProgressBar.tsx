import React from "react";
import { GrInProgress } from "@react-icons/all-files/gr/GrInProgress";

const CProgressBar = () => {
  return (
    <div role="status">
      <GrInProgress className="animate-spin" size={60} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CProgressBar;
