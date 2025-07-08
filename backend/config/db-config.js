const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:admin@cluster0.v8mcn.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`database connected successfully :${conn.connection.name}`)
    } catch (error) {
        console.log(`database connection failed : ${error.message}`)
    }
}
module.exports= connectdb