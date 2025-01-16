import { Button } from "@/components/ui/button";
import Login from "@/pages/Login";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Login />
    </main>
  );
}

export default App;
