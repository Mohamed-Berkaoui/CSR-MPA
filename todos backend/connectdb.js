const mongoose=require("mongoose")

const connectdb=async()=>{
    try {
        const con=await mongoose.connect(process.env.DB_URI)
        console.log(con.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports=connectdb