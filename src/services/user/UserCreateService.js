import hashedPassword from "../../utility/hashedPassword.js";
const UserCreateService= async (req,res,DataModel) => {
   try{
      let reqBody=req.body;
      let existingEmail = await DataModel.aggregate([{$match:{email: reqBody['email']}}]);

      //let userExists = await DataModel.exists({email: reqBody['email']});//we get only an _id (ObjectId)
      

          if(existingEmail.length ===0){
               reqBody.password = await hashedPassword(reqBody.password);//hashedPassword
               let data = await DataModel.create(reqBody)
               res.status(201).json({message: "success", data:data});
          }
          else{
            res.status(409).json({message: "fail", data:"Email Already Exist"}); //conflicting-request
          }
   }
   catch (error) {
      res.status(500).json({ message: "error", data:error.toString()});
   }
}

export default UserCreateService