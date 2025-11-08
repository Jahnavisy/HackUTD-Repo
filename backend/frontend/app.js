import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error connecting to Flask:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Flask + React Test 🔗</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default App;

