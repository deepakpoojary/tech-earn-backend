const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/nos", async (req, res) => {
  try {
    console.log("hit nos ");
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    res.json({ nos: randomNumber });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// Get note by date
router.get("/:date", async (req, res) => {
  const date = new Date(req.params.date);
  console.log("hit get note by date");
  try {
    const startDate = new Date(date);
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);
    console.log(startDate, endDate);
    let note = await Note.findOne({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    console.log(note.content);
    if (!note) {
      return res.status(404).json({ message: "No entry found for this date" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error12" });
  }
});

// Update note
// Update note
router.post("/:date", async (req, res) => {
  const date = new Date(req.params.date);
  const { content, charCount, earnings } = req.body;
  console.log("note creation");
  try {
    const note = new Note({
      date,
      content,
      charCount,
      earnings,
    });
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/:date", async (req, res) => {
  const date = new Date(req.params.date);
  const { content, charCount, earnings } = req.body;
  try {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    const note = await Note.findOneAndUpdate(
      {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
      { content, charCount, earnings },
      { new: true, upsert: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find(); // This will return all notes
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
