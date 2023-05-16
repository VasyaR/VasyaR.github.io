const express = require("express");
const { db } = require("./db");

const router = express.Router();

router.get("/messages", async (req, res) => {
  const messages = (await db.query(`SELECT * FROM messages ORDER BY id;`)).rows;
  res.send(messages);
});
router.post("/messages", async (req, res) => {
  const body = req.body;
  await db.query(
    `INSERT INTO messages(role,text,user_login) VALUES ($1,$2,$3)`,
    [body.role, body.text, body.user_login]
  );
  res.send("Posted message.");
});
router.patch("/messages/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  await db.query(`UPDATE messages SET text = $1 WHERE id = $2;`, [
    body.text,
    id,
  ]);
  res.send("Updated message");
});

router.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM messages WHERE id=$1;", [id]);
  res.send("Deleted message");
});

module.exports = router;
