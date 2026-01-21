import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// GET /
router.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// GET /api/items
router.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET /api/items/:id
router.get("/api/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// POST /api/items
router.post("/api/items", async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.status(201).json(savedItem);
});

// PUT /api/items/:id
router.put("/api/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedItem);
});

// DELETE /api/items/:id
router.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

export default router;
