import mongoose from "mongoose";
import TransactionModel from "../../models/transaction/TransactionModel.js";
import DeleteService from "../../services/common/DeleteService.js";
import CreateWithUserIdService from "../../services/common/CreateWithUserIdService.js";
import UpdateService from "../../services/common/UpdateService.js";

const addTransaction = async (req, res) => {
    await CreateWithUserIdService(req, res, TransactionModel)
}


const getAllTransaction = async (req, res) => {
    try{
        const loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        const {frequency, fromDate, toDate, type} = req.params;

        // Get the current date
        let currentDate = new Date();
       // Calculate the date 7 days ago// 30 days ago // 365 days ago
        let sevenDaysAgo = new Date(); //sevenDaysAgo//30 days ago// last 1 year ago
        if(frequency !== "custom"){
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - Number(frequency));
        }


  
        //if frequency is not custom
        const conditionFrequency = frequency !=="custom" ? {
            date:{
                $gt: sevenDaysAgo
            },
        } : {
            date: ({
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            }),
        };



        const conditionType = type !=="all" && {type:type};


       let transactions = await TransactionModel
           .find({
               ...conditionFrequency,
               userId: new ObjectId(loginUserId),
               ...conditionType
           }).sort({date:1})



       //using condition inside the find method
        /*
        const transactions = await transactionModel.find({
            ...(frequency !== "custom"
                ? {
                    date: {
                        $gt: sevenDaysAgo,
                    },
                }
                : {
                    date: {
                        $gte: selectedDate[0],
                        $lte: selectedDate[1],
                    },
                }),
            userId: new ObjectId(loginUserId),
            ...(type !== "all" && { type }),
        });

         */



       res.status(200).json({status:true, message: "success", data:transactions})
    }
    catch(error){
        res.status(500).json({status:true, message: "error", data:error.toString()})
    }
}

const getTransactionsReport = async (req, res) => {
    try{
        const loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;


        let transactions = await TransactionModel.find({userId: new ObjectId(loginUserId)}).sort({date:1});


        res.status(200).json({status:true, message: "success", data:transactions})
    }
    catch(error){
        res.status(500).json({status:true, message: "error", data:error.toString()})
    }
}



const deleteTransaction = async (req, res) => {
    await DeleteService(req, res, TransactionModel)
}

const updateTransaction = async (req, res) => {
    await UpdateService(req, res, TransactionModel)
}



export {addTransaction, getAllTransaction, getTransactionsReport, deleteTransaction, updateTransaction};