// Temp.jsx
import React, { useState, useEffect } from "react";

// Custom hook to simulate typing
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset before re-typing
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

function Temp() {
  const finalText =
    "Hey Eshwar! This is a simulated ChatGPT-style typing animation. Looks cool, right? 😎";
  const typedText = useTypingEffect(finalText, 40); // Change speed if you want

  return (
    <div style={styles.container}>
      <div style={styles.bubble}>
        {typedText}
        <span className="blinking-cursor">|</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#111",
    color: "#eee",
    padding: "2rem",
    fontFamily: "monospace",
    fontSize: "1.2rem",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: "#222",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    border: "1px solid #444",
    minWidth: "300px",
  },
};

export default Temp;
