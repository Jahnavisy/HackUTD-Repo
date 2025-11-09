import React, { useState } from "react";

export default function FinanceCalculator() {
  const [price, setPrice] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // Assign interest rate automatically based on selected plan
  const getInterestRate = (planName) => {
    switch (planName) {
      case "Basic":
        return 3.5;
      case "Standard":
        return 4.2;
      case "Premium":
        return 5.0;
      default:
        return 0;
    }
  };

  const calculatePayment = () => {
    const principal = parseFloat(price);
    const monthlyRate = getInterestRate(plan) / 100 / 12;
    const payments = parseFloat(loanTerm);

    if (!principal || !monthlyRate || !payments) {
      alert("Please fill all fields correctly");
      return;
    }

    const payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(255, 0, 0, 0.2)",
          width: "400px",
        }}
      >
        <h2 style={{ color: "red", marginBottom: "20px" }}>
          Finance Calculator
        </h2>

        <input
          type="number"
          placeholder="Car Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "15px",
            margin: "10px 0",
            border: "2px solid red",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
          }}
        />

        <input
          type="number"
          placeholder="Loan Term (in months)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          style={{
            padding: "15px",
            margin: "10px 0",
            border: "2px solid red",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
          }}
        />

        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          style={{
            padding: "15px",
            margin: "10px 0",
            border: "2px solid red",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <option value="">Select Plan</option>
          <option value="Basic">Basic (3.5%)</option>
          <option value="Standard">Standard (4.2%)</option>
          <option value="Premium">Premium (5.0%)</option>
        </select>

        <button
          onClick={calculatePayment}
          style={{
            padding: "15px",
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>

        {monthlyPayment && (
          <p style={{ marginTop: "20px", fontSize: "18px", color: "black" }}>
            Monthly Payment:{" "}
            <strong style={{ color: "red" }}>${monthlyPayment}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
