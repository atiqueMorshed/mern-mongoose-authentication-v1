import mongoose from 'mongoose';

const connectDB = () => {
  // Not Using try catch because the errors are handled on Server.js file (process.on("unhandledRejection"))
  mongoose.connect(process.env.MONGO_URI);
  console.log('Mongoose: MongoDB Connected!');
};

export default connectDB;
