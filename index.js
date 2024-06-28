import express from "express";
import cors from "cors";

const app = express();

import { fetchPrices } from "./controllers/seatgeek.js";
import { getTicketMasterPrice } from "./controllers/Ticketmaster.js";
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/health", (req, res) => {
  res.send("Server is running");
});
app.post("/getPrices", async (req, res) => {
  try {
    const timeNow = new Date().toLocaleString();
    const { eventId } = req.body;
    const prices = await fetchPrices(eventId);
    //if (prices === null) return res.status(400).json({min: "No tickets available"})
    console.log(
      `[ ${timeNow} ] - Min price fetched for seatgeek event id ${eventId} is ${prices}`
    );
    return res.status(200).json({ min: prices });
  } catch (err) {
    console.log(err);
  }
});

app.get("/ticketMasterPrice/:eventId", async (req, res) => {
  try {
    const timeNow = new Date().toLocaleString();
    const eventId = req.params.eventId
    console.log(eventId)
    const prices = await getTicketMasterPrice(eventId);
    if (prices == null) return res.status(400).json({min: "No tickets available or event Not Found"})
    console.log(
      `[ ${timeNow} ] - Min price fetched for ticketMaster event id ${eventId} is ${prices}`
    );
    return res.status(200).json({ min: prices });
  } catch (err) {
    console.log(err);
  }
});

app.listen(80, () => {
  console.log("Server is running on port 3000");
});
