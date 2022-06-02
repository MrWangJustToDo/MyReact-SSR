import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const [state, setState] = useState(new Date().toString());
  useEffect(() => {
    const id = setInterval(() => setState(new Date().toString()), 1000);
    return () => clearInterval(id);
  }, []);
  // Math.random() > 0.5 ? useEffect(() => {}) : useState();
  return <div>home page {state}</div>;
}
