import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB = ( handler: any ) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {

    return handler(req, res);
  }

    try {
        await mongoose.connect(process.env.MONGODB_URI, 
            {
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true
            });
    }catch(err){
        process.exit(1);
    }

  return handler(req, res);
};

export default connectDB;