import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Replace 'my_local_db' with whatever you want your DB to be named. Here bookstore is the name of db
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;