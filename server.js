let colorCount = 0;

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
