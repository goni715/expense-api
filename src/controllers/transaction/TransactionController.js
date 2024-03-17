import TransactionModel from "../../models/transaction/TransactionModel.js";
import CreateService from "../../services/common/CreateService.js";
import mongoose from "mongoose";
import transactionModel from "../../models/transaction/TransactionModel.js";

const addTransaction = async (req, res) => {
    try{
        const loginUserId = req.headers.id;
        const reqBody = req.body;
        reqBody.userId=loginUserId;
        let data = await TransactionModel.create(reqBody)
        res.status(201).json({status: true,message: "success", data: data});
    }
    catch(error){
        res.status(500).json({status:false, message: "error", data: error});
    }
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


export {addTransaction, getAllTransaction};