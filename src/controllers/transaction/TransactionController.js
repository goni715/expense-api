import TransactionModel from "../../models/transaction/TransactionModel.js";
import CreateService from "../../services/common/CreateService.js";

const addTransaction = async (req, res) => {
    await CreateService(req, res, TransactionModel)
}


const getAllTransaction = async (req, res) => {
    try{
       let transactions = await TransactionModel.find({});
       res.status(200).json({status:true, message: "success", data:transactions})
    }
    catch(error){
        res.status(500).json({status:true, message: "error", data:error.toString()})
    }
}


export {addTransaction, getAllTransaction};