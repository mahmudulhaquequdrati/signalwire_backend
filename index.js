const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const { Voice } = require("@signalwire/realtime-api");
// const path = require("path");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");
const errorHandler = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 5000;
const app = express();

const authRoute = require("./src/routes/userRoute");

// User Middlewares
app.use(cors());
app.use(express.json());
connectDB();
colors.enable();

app.get("/", (req, res) => {
  res.send(
    "<h2 style='color:green;box-sizing:border-box; margin:0; background: #f3f3f9; height: 95vh;'>Server is Running!<h2>"
  );
});

const client = new Voice.Client({
  project: "5c46b95f-6635-4c38-a973-e3004fb9d2ac",
  token: "PT570e119c94975673ab1416ca666b3c319ed82dc0a182c541",
  host: "https://vultik.signalwire.com/api",
  topics: ["office"],
});
console.log("yes");
client.on("call.received", async (call) => {
  console.log("Got call", call.from, call.to);

  try {
    // await call.answer();
    console.log("Inbound call answered");

    // await call.playTTS({ text: "Welcome to SignalWire!" });
  } catch (error) {
    console.error("Error answering inbound call", error);
  }
});
// --------------------
// ---------------
// ----------
// -----
// Routes
app.use("/api/v1/user", authRoute);
// -----
// ----------
// ---------------
// --------------------
// Not Found Or 404 error Page

// Handle Error
app.use(errorHandler);
// -----

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    colors.green.underline(`📗Connected`),
    colors.yellow.underline("to Server!")
  );

  app.listen(PORT, () => console.log(`Server running in port no : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(colors.red("📕", err));
});
