import mongoose from "mongoose";
const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cognilium');
        console.log("database connected without any issue");
    }catch(err){
        console.log("ERROR OCCOURED WHILE CONNECTING TO DATABASE", err);
    }
 
};


export default connectDatabase;