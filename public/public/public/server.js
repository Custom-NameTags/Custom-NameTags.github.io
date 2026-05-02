require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/submit", async (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = `
NEW NAME TAG REQUEST

Name: ${data.name}
Tag Text: ${data.tagText}

Color 1: ${data.color1}
Color 2: ${data.color2}
Color 3: ${data.color3}

Extra Colors:
${Object.keys(data)
  .filter(k => k.includes("extraColor"))
  .map(k => data[k])
  .join("\n") || "None"}

Description:
${data.description}
`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Name Tag Request",
      text: message
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
