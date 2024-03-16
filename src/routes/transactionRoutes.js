import express from "express";
import {addTransaction, getAllTransaction} from "../controllers/transaction/TransactionController.js";

const router = express.Router();

router.post("/add-transaction", addTransaction);
router.get("/get-all-transaction", getAllTransaction)




export default router;