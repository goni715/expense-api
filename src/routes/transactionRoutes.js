import express from "express";
import {addTransaction, getAllTransaction} from "../controllers/transaction/TransactionController.js";
import AuthVerifyMiddleware from "../middlewares/AuthVerifyMiddleware.js";

const router = express.Router();

router.post("/add-transaction", AuthVerifyMiddleware, addTransaction);
router.get("/get-all-transaction/:frequency/:fromDate/:toDate/:type", AuthVerifyMiddleware, getAllTransaction);




export default router;