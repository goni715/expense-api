import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery', false);
        let uri = process.env.MONGO_URI;
        //let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};

        await mongoose.connect(uri);
        console.log("Database connection success")
    }
    catch(error){
        console.log("Connection Failed");
        console.log(error);
    }
}


export default dbConnect;