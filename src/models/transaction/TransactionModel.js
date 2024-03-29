import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required: true,
        },
        amount: {
            type: Number,
            required: [true, "amount is required"],
        },
        type: {
            type: String,
            required: [true, "type is required"],
        },
        category: {
            type: String,
            requires: [true, "category is required"],
        },
        reference: {
            type: String,
        },
        description: {
            type: String,
            required: [true, "desc is required"],
        },
        date: {
            type: Date,
            required: [true, "date is required"],
        },
    },
    { timestamps: true, versionKey:false }
);

const TransactionModel = mongoose.model("transactions", TransactionSchema);

export default TransactionModel;
