// src/depreciation.js
import React from "react";

function Depreciation() {
  const data = {
    "4Runner": {
      initial_price: 41270,
      data_points: [
        { year: 0, residual_value: 41270, depreciation_loss: 0 },
        { year: 1, residual_value: 32999, depreciation_loss: 8271 },
        { year: 2, residual_value: 32360, depreciation_loss: 8910 },
        { year: 3, residual_value: 31700, depreciation_loss: 9570 },
        { year: 4, residual_value: 31500, depreciation_loss: 9780 },
        { year: 5, residual_value: 30900, depreciation_loss: 10370 }
      ],
      description:
        "The 4Runner retains its value fairly well in the first few years, with moderate depreciation compared to other models."
    },
    "Grand_Highlander": {
      initial_price: 41360,
      data_points: [
        { year: 0, residual_value: 41360, depreciation_loss: 0 },
        { year: 1, residual_value: 34742, depreciation_loss: 6618 },
        { year: 2, residual_value: 31964, depreciation_loss: 8396 },
        { year: 3, residual_value: 31276, depreciation_loss: 9084 },
        { year: 4, residual_value: 30100, depreciation_loss: 11260 },
        { year: 5, residual_value: 26600, depreciation_loss: 14760 }
      ],
      description:
        "The Highlander shows a steeper depreciation over 5 years compared to the 4Runner, especially after year 3."
    },
    "Sienna_Hybrid": {
      initial_price: 38940,
      data_points: [
        { year: 0, residual_value: 38940, depreciation_loss: 0 },
        { year: 1, residual_value: 33360, depreciation_loss: 5580 },
        { year: 2, residual_value: 31600, depreciation_loss: 7340 },
        { year: 3, residual_value: 30590, depreciation_loss: 8350 },
        { year: 4, residual_value: 26560, depreciation_loss: 12380 },
        { year: 5, residual_value: 23900, depreciation_loss: 15040 }
      ],
      description:
        "The Sienna Hybrid depreciates the fastest among these models, showing significant loss after year 3."
    }
  };

  const cars = Object.entries(data);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#D6001C", marginBottom: 20 }}>
        Toyota Depreciation Comparison
      </h2>

      {cars.map(([name, car]) => {
        const points = car.data_points;
        const maxVal = Math.max(...points.map((p) => p.residual_value));

        return (
          <div
            key={name}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: 15,
              marginBottom: 30
            }}
          >
            <h3>{name.replace("_", " ")}</h3>
            <p>
              <strong>Initial Price:</strong> ${car.initial_price}
            </p>

            <h4>Depreciation by Year</h4>
            <ul>
              {points.map((point) => (
                <li key={point.year}>
                  Year {point.year}: ${point.residual_value} value (Loss: $
                  {point.depreciation_loss})
                </li>
              ))}
            </ul>

            {/* BAR GRAPH WITH AXES */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 20
              }}
            >
              <div style={{ marginBottom: 5 }}>Residual Value ($)</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: 150,
                  gap: 10,
                  background: "#f5f5f5",
                  borderRadius: 12,
                  padding: "10px"
                }}
              >
                {points.map((p) => {
                  const heightPx = (p.residual_value / maxVal) * 120 + 20; // shorter bars
                  return (
                    <div
                      key={p.year}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: `${heightPx}px`,
                          backgroundColor: "#D6001C",
                          borderRadius: 6
                        }}
                      />
                      <span style={{ fontSize: 12, marginTop: 4 }}>
                        Year {p.year}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 5 }}>Years</div>
            </div>

            {/* Description under graph */}
            <p style={{ marginTop: 15, fontStyle: "italic" }}>{car.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Depreciation;
