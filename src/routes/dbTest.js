const express = require("express");
const router = express.Router();

const db = require("../services/databaseService");

// GET /db-test
router.get("/db-test", async (req, res) => {
  try {
    const rows = await db.query("SELECT 1 AS ok");

    res.status(200).json({
      message: "Database connection works!",
      result: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

module.exports = router;