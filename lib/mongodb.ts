import mongoose from "mongoose"

const ConnectDb = () => {
  const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI){
    throw new Error("No mongo db connection string present")
}
const connect = mongoose.connect(MONGO_URI).then((mongoose)=>{
    return mongoose
})
return connect
}
export default ConnectDb