import express from "express";
import {
    addTransaction, deleteTransaction,
    getAllTransaction,
    getTransactionsReport, updateTransaction
} from "../controllers/transaction/TransactionController.js";
import AuthVerifyMiddleware from "../middlewares/AuthVerifyMiddleware.js";

const router = express.Router();


router.post("/add-transaction", AuthVerifyMiddleware, addTransaction);
router.get("/get-all-transaction/:frequency/:fromDate/:toDate/:type", AuthVerifyMiddleware, getAllTransaction);
router.get("/get-transactions-report", AuthVerifyMiddleware, getTransactionsReport);
router.delete("/delete-transaction/:id", AuthVerifyMiddleware, deleteTransaction);
router.put("/update-transaction/:id", AuthVerifyMiddleware, updateTransaction);




export default router;