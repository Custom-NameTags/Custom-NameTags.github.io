const express = require("express");
const app = express();
const path = require("path");

// lets us read JSON from frontend requests
app.use(express.json());

// serves your /public folder
app.use(express.static("public"));

// makes sure homepage loads correctly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// handles form submission from your script.js fetch("/submit")
app.post("/submit", (req, res) => {
  console.log("Received form data:", req.body);

  // For now we just respond success
  res.json({ success: true });
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});let colorCount = 0;

document.getElementById("addColorBtn").addEventListener("click", () => {
  colorCount++;

  const row = document.createElement("div");
  row.className = "color-pill";

  row.innerHTML = `
    <span>Extra ${colorCount}</span>
    <input type="color" name="extraColor${colorCount}">
  `;

  document.getElementById("extraColors").appendChild(row);
});

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());

  const res = await fetch("/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Submitted!");
    e.target.reset();
  } else {
    alert("Error.");
  }
});
