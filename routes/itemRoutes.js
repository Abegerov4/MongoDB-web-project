import express from "express";
import Item from "../models/Item.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

//GET /api/items
 
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /api/items/:id

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

//POST /api/items
 
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  //PUT /api/items/:id  (FULL update)
 
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// PATCH /api/items/:id  (PARTIAL update)
 
router.patch("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});


 // DELETE /api/items/:id
 
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(204).send();
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

export default router;