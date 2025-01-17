import { Button } from "@/components/ui/button";
import Login from "@/pages/Login";
import { useState } from "react";
import "./App.css";
import Navbar from "@/components/Navbar";
import HeroSection from "@/pages/student/HeroSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <Login />
    </main>
  );
}

export default App;
