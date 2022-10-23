const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgetController");

router.get("/",budgetController.getAllTransaction);
router.post("/create",budgetController.createTransaction);
router.put("/update", budgetController.updateTransaction)
router.delete("/delete", budgetController.deleteTransaction);



module.exports = router;
