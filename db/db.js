import mongoose from "mongoose"

const connenctDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_TASK_URI)
        console.log("🚀 MONGO DB IS CONNECTED 😁")
    }catch (err){
        console.log("🤔 mongo connection failed", err)
        process.exit(1)
    }
}

export default connenctDB