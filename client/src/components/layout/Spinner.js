import Spinner from "./spinner.gif";
import React from "react";

export default function Spin() {
  return (
    <div>
      <img
        src={Spinner}
        alt="Loading..."
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
}
