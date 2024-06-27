import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('MongoDB connected');
    } catch (error) {
      
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('Error connecting to MongoDB');
      }
      process.exit(1);
    }
};

export default connectDB;
