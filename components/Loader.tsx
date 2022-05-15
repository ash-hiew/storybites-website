import React from "react";
import { motion } from "framer-motion";

const loadingCircle = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "black",
  borderRadius: "0.25rem",
};

export default function Loader() {
  return (
    <div>
      <span style={loadingCircle} />
      <span style={loadingCircle} />
      <span style={loadingCircle} />
    </div>
  );
}
