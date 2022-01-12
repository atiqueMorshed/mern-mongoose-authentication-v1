import mongoose from 'mongoose';

const connectDB = () => {
  // Not Using try catch because the errors are handled on Server.js file (process.on("unhandledRejection"))
  if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Mongoose: MongoDB Connected!');
  } else {
    throw new Error('MongoDB URI incorrect.');
  }
};

export default connectDB;
