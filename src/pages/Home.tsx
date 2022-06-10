import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState(new Date().toString());
  useEffect(() => {
    const id = setInterval(() => {
      setState(new Date().toString());
    });
    return () => clearInterval(id);
  });

  return (
    <div>
      home page {state}
    </div>
  );
}
