import mongoose from "mongoose";

const UpdateService= async (req, res,Model) => {

    try{
        let ID = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(ID)};
        let PostBody=req.body;

        let Update = await Model.updateOne(UpdateQueryObject,PostBody);
        res.status(200).json({message: "success", data: Update});

    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}

export default UpdateService;



