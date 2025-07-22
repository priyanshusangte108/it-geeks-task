const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected successfully :${conn.connection.name}`)
    } catch (error) {
        console.log(`database connection failed : ${error.message}`)
    }
}
module.exports= connectdb