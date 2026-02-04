import express from "express";
import Item from "../models/Item.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

// GET — OPEN
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET by ID — OPEN
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// POST — PROTECTED
router.post("/", apiKeyAuth, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const item = new Item(req.body);
  const saved = await item.save();
  res.status(201).json(saved);
});

// PUT — PROTECTED
router.put("/:id", apiKeyAuth, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(updated);
});

// PATCH — PROTECTED
router.patch("/:id", apiKeyAuth, async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(updated);
});

// DELETE — PROTECTED
router.delete("/:id", apiKeyAuth, async (req, res) => {
  const deleted = await Item.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(204).send();
});

export default router;