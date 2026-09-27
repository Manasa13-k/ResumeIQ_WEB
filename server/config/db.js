const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB Notice: MONGODB_URI is empty in .env. Ready for connection string.')
      return
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB Connection Failure: ${error.message}`)
  }
}

module.exports = connectDB
